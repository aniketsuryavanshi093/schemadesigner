import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { AISchemaRequest, AISchemaResponse } from "@/types";

// Zod schema matching the database schema structure
const columnSchema = z.object({
  columnName: z.string(),
  columnDataType: z.enum([
    "bigint",
    "boolean",
    "varchar",
    "char",
    "int",
    "flaot(8,2)",
    "decimal(8,2)",
    "date",
    "datetime",
    "enum",
  ]),
  columnIndexType: z.enum(["primary", "unique", "none", "index"]).optional(),
  isNullable: z.boolean().optional(),
  comment: z.string().optional(),
});

const tableSchema = z.object({
  tableName: z.string(),
  tableColor: z.string().optional(),
  isEditing: z.boolean().default(false),
  columns: z.array(columnSchema),
  tableComment: z.string().optional(),
});

const relationSchema = z.object({
  id: z.string(),
  tablefrom: z.string(),
  tableto: z.string(),
  head: z.string(),
  tail: z.string(),
  relation: z.enum(["onetoone", "onetomany", "manytomamy"]),
});

// Main schema for AI generation
const schemaGenerationSchema = z.object({
  title: z.string().describe("Title of the database schema"),
  description: z
    .string()
    .describe("Brief description of what this schema represents"),
  tables: z
    .array(tableSchema)
    .describe("Array of database tables with their columns"),
  relations: z
    .array(relationSchema)
    .describe("Array of relationships between tables"),
});

/**
 * POST /api/ai-schema
 * Generates database schema based on AI prompt using Google Gemini (FREE)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: AISchemaRequest = await request.json();

    // Validate request
    if (!body.prompt || body.prompt.trim().length === 0) {
      return NextResponse.json<AISchemaResponse>(
        {
          success: false,
          error: "Prompt is required",
          message: "Please provide a valid prompt to generate schema",
        },
        { status: 400 },
      );
    }

    // Validate prompt length
    if (body.prompt.length > 1000) {
      return NextResponse.json<AISchemaResponse>(
        {
          success: false,
          error: "Prompt too long",
          message: "Prompt must be less than 1000 characters",
        },
        { status: 400 },
      );
    }

    // Check for API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json<AISchemaResponse>(
        {
          success: false,
          error: "API key not configured",
          message:
            "Google Gemini API key is not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your environment variables.",
        },
        { status: 500 },
      );
    }

    // Generate schema using Google Gemini with guardrails
    const result = await generateObject({
      model: google("gemini-3-flash-preview"), // FREE model with generous limits
      schema: schemaGenerationSchema,
      system: `You are a professional database schema architect specializing in SQL database design.

STRICT RULES:
1. ONLY respond with database schema designs - nothing else
2. If the prompt is not related to database, schema, or data modeling, respond with a simple error schema with title "Invalid Request"
3. Generate realistic, production-ready database schemas with proper relationships
4. Use appropriate data types for each column
5. Include primary keys, foreign keys, and indexes where necessary
6. Follow database normalization best practices
7. Add meaningful comments for tables and complex columns
8. Generate between 2-10 tables depending on complexity
9. Use snake_case for table and column names
10. Assign different colors to tables for better visualization (use hex colors like #6366f1, #10b981, #f59e0b, #ef4444, #8b5cf6)

GUARDRAILS:
- Reject prompts about: politics, violence, illegal activities, personal data, or anything unrelated to databases
- Only accept prompts related to: database design, schema creation, data modeling, SQL structures
- If unsure, create a minimal valid schema

COLUMN DATA TYPES AVAILABLE:
- bigint, boolean, varchar, char, int, flaot(8,2), decimal(8,2), date, datetime, enum

INDEX TYPES:
- primary (for primary keys)
- unique (for unique constraints)
- index (for regular indexes)
- none (no index)

RELATION TYPES:
- onetoone: One-to-one relationship
- onetomany: One-to-many relationship
- manytomamy: Many-to-many relationship

IMPORTANT: Always set isEditing to false for all tables.`,
      prompt: body.prompt,
      temperature: 0.7,
    });

    // Validate the generated schema
    if (!result.object.tables || result.object.tables.length === 0) {
      throw new Error("AI generated an invalid schema");
    }

    // Return success response
    return NextResponse.json<AISchemaResponse>(
      {
        success: true,
        data: {
          tables: result.object.tables,
          relations: result.object.relations,
          schemaTitle: result.object.title,
          description: result.object.description,
        },
        message: "Schema generated successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error in AI schema generation:", error);

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json<AISchemaResponse>(
        {
          success: false,
          error: "Invalid JSON",
          message: "Request body must be valid JSON",
        },
        { status: 400 },
      );
    }

    // Handle AI API errors
    if (error.message?.includes("API key") || error.message?.includes("401")) {
      return NextResponse.json<AISchemaResponse>(
        {
          success: false,
          error: "API Configuration Error",
          message:
            "Google Gemini API key is invalid or not configured properly",
        },
        { status: 500 },
      );
    }

    // Generic error response
    return NextResponse.json<AISchemaResponse>(
      {
        success: false,
        error: "Internal server error",
        message:
          error.message || "Failed to generate schema. Please try again later.",
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/ai-schema
 * Health check endpoint
 */
export async function GET() {
  const hasApiKey = !!process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  return NextResponse.json(
    {
      success: true,
      message: "AI Schema API is running with Google Gemini",
      version: "2.0.0",
      aiConfigured: hasApiKey,
      model: "gemini-1.5-flash",
      provider: "Google Gemini (FREE)",
    },
    { status: 200 },
  );
}

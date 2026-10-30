# AI Schema Generation API

## Overview

This API endpoint generates database schemas based on natural language prompts using AI.

## Endpoint

### POST `/api/ai-schema`

Generates a database schema based on the provided prompt.

#### Request Body

```typescript
{
  "prompt": string,      // Required: Description of the schema (max 1000 chars)
  "userId"?: string      // Optional: User ID for tracking
}
```

#### Response

```typescript
{
  "success": boolean,
  "data"?: {
    "tables": Table[],
    "relations": relationtype[],
    "schemaTitle": string,
    "description": string
  },
  "error"?: string,
  "message"?: string
}
```

#### Status Codes

- `200` - Success
- `400` - Bad Request (invalid prompt or validation error)
- `500` - Internal Server Error

---

### GET `/api/ai-schema`

Health check endpoint to verify the API is running.

#### Response

```typescript
{
  "success": true,
  "message": "AI Schema API is running",
  "version": "1.0.0"
}
```

---

## Usage Examples

### Basic Usage

```typescript
const response = await fetch("/api/ai-schema", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "Create an e-commerce database schema",
  }),
});

const data = await response.json();

if (data.success) {
  console.log("Tables:", data.data.tables);
  console.log("Relations:", data.data.relations);
}
```

### With Error Handling

```typescript
try {
  const res = await fetch("/api/ai-schema", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "Blog database design" }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to generate schema");
  }

  // Use the generated schema
  const { tables, relations, schemaTitle } = data.data;
} catch (error) {
  console.error("Error:", error.message);
}
```

---

## Integration with AI Services

### Current Implementation

The API currently uses mock data for demonstration. To integrate with a real AI service:

1. **OpenAI Integration**

```typescript
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a database schema expert. Generate SQL schema based on user requirements.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  }),
});
```

2. **Environment Variables**
   Create a `.env.local` file:

```env
OPENAI_API_KEY=your_api_key_here
ANTHROPIC_API_KEY=your_api_key_here
```

3. **Update the `generateSchemaWithAI` function** in `route.ts`

---

## Type Definitions

### Table

```typescript
interface Table {
  tableColor?: string;
  isEditing: boolean;
  isTableOpen?: boolean;
  isCommentOpen?: boolean;
  tableName: string;
  columns?: columns[];
  tableComment?: string;
  tableIndex?: string;
}
```

### Column

```typescript
interface columns {
  columnName: string;
  isEditing?: boolean;
  columnIndex?: number;
  columnIndexType?: "primary" | "unique" | "none" | "index";
  isNullable?: boolean;
  columnDataType?: columntype;
  comment?: string;
}
```

### Relation

```typescript
type relationtype = {
  head: string;
  tail: string;
  id: string;
  tablefrom: string;
  tableto: string;
  relation: "onetoone" | "onetomany" | "manytomamy";
};
```

---

## Error Handling

### Validation Errors

```json
{
  "success": false,
  "error": "Prompt is required",
  "message": "Please provide a valid prompt to generate schema"
}
```

### Server Errors

```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Failed to generate schema. Please try again later."
}
```

---

## Testing

### Test the Health Check

```bash
curl http://localhost:3000/api/ai-schema
```

### Test Schema Generation

```bash
curl -X POST http://localhost:3000/api/ai-schema \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create an e-commerce database schema"}'
```

---

## Architecture

```
src/
├── app/
│   └── api/
│       └── ai-schema/
│           ├── route.ts          # API endpoint handlers
│           └── README.md         # This file
├── components/
│   └── Schema/
│       └── AiSchemaPopup.tsx    # UI component that calls the API
└── types/
    └── index.ts                  # TypeScript type definitions
```

---

## Future Enhancements

1. **AI Service Integration**
   - Add OpenAI GPT-4 integration
   - Add Anthropic Claude integration
   - Add custom AI model support

2. **Features**
   - Save generated schemas to database
   - Schema versioning
   - Export to SQL/DDL
   - Visual schema editor integration

3. **Performance**
   - Add caching for similar prompts
   - Rate limiting
   - Request queuing

4. **Security**
   - API authentication
   - Input sanitization
   - Rate limiting per user

---

## License

MIT

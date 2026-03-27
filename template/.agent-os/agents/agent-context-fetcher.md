# Agent: Context Fetcher

## Purpose

Validate and manage context availability before performing expensive operations like file reads, web fetches, or searches. Prevents redundant context loading and keeps token usage efficient.

## Problem Statement

During development, the assistant may need to reference code, documentation, or external resources multiple times. Without a gating mechanism:

- The same file or URL may be fetched multiple times
- Large files bloat the context window unnecessarily
- Search results duplicate previous findings
- API calls waste resources on already-known information

Context Fetcher solves this by checking what's already available before retrieving more.

## Behaviors

### Check Availability

Before reading a file or fetching information:

```
Context contains file X? → report what's already available
Context contains URL Y? → avoid re-fetch
Context has search results for term Z? → reuse or extend
```

### Report Gaps

If information is missing:

```
"File src/index.ts: not in context. Recommend reading. Estimated tokens: ~120"
"Search for 'error handling patterns': no previous results. Suggest semantic_search."
```

### Suggest Optimization

If context is sparse or incomplete:

```
"You've read 3 files so far (~400 tokens). To understand the full flow, recommend also reading:
- src/services/api.ts (~200 tokens)
- tests/integration/api.test.ts (~150 tokens)
"
```

## Integration Points

**Input**: Planned operation (read, search, fetch)
**Output**: Availability report + recommendation
**Used by**: Main assistant before calling file_search, read_file, fetch_webpage, semantic_search

## Implementation Notes

Context Fetcher should:

1. Maintain a session-local registry of what's been loaded
2. Estimate token count for suggestions
3. Provide clear, actionable recommendations
4. Support skipping the check if the user explicitly requests a fresh fetch
5. Report context pressure if nearing token limits

## Acceptance Criteria

- [ ] Correctly identifies files, URLs, and search results in context
- [ ] Estimates token usage for files to-be-read
- [ ] Recommends reading or skipping based on context availability
- [ ] Works with file_search, read_file, semantic_search, fetch_webpage
- [ ] Reduces redundant context loads by >30% in typical workflows
- [ ] Reports are concise, <50 words

## Example Outputs

```
✓ src/index.ts is in context (last 40 lines). No need to re-read.

✗ tests/integration/api.test.ts not in context. Estimate: 180 tokens.
  Recommend: read_file (build understanding) vs skip (reduce context).

⚠ Context pressure: 85% of budget used. Suggest archiving older reads
  if fetching large files next.
```

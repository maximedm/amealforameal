# Workflow

## Before Starting a Task

1. **Check project rules** — Review the `.claude/rules/` files and `CLAUDE.md` for constraints, conventions, or gotchas relevant to the area you're working in.
2. **Activate skills** — Check if any available skills match the domain of the task. Activate the relevant skill before writing code, not after getting stuck.
3. **Search docs** — Use `search-docs` before relying on training data for any framework or package work.

## Use Subagents and Parallelism

- When a task involves multiple independent concerns, launch subagents in parallel rather than working through them sequentially.
- Use the most appropriate specialized subagent for each concern.
- When researching a problem, prefer launching parallel exploration agents over sequential manual searches.
- For code reviews and quality checks, run multiple review agents concurrently and aggregate findings.

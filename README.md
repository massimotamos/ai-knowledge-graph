i# AI-Enhanced Knowledge Graph for Security Log Analysis

![Example -- Potential Policy Breach
Identified](docs/example-breach.png)

> **Figure 1 -- Example visualization of potential policy breaches.**\
> Users labelled with prefix `u-` represent standard (non-privileged)
> accounts.\
> In this example, certain `u-` users are connected to the
> `unix system administrators` group.\
> Standard users should not normally be granted UNIX or other
> administrative privileges.\
> These relationships therefore represent potential deviations from
> access control policy.

------------------------------------------------------------------------

## Project Overview

This project is based on the original work by:

Robert McDermott\
Original repository:\
https://github.com/robert-mcdermott/ai-knowledge-graph.git

This fork extends the original implementation by integrating Large
Language Models (LLMs) to:

-   Automatically categorize raw log data
-   Extract structured relationships
-   Detect anomalous privilege assignments
-   Highlight structural deviations from security policy

------------------------------------------------------------------------

## Enhanced HTML Filtering Capabilities

Compared to the original implementation, the HTML graph generation has
been enhanced to support more precise filtering via extended combobox
logic.

Supported filtering operators:

-   StartsWith\
-   Not StartsWith\
-   Contains\
-   Not Contains\
-   Exact match\
-   Label-based filtering

This enables rapid identification of role prefixes (`u-`, `a-`, `x-`,
`o-`, `s-`, `t-`) and isolation of potential policy breaches.

------------------------------------------------------------------------

## Generating the Knowledge Graph

Example command:

``` bash
python generate-graph.py --input data/audit_simulated_access.log --output audit_simulated_access-kg.html
```

------------------------------------------------------------------------

## LLM JSON Format Note

This fork assumes a specific JSON response structure from the configured
local LLM.

If:

-   A different model is used
-   The prompt structure is modified
-   JSON schema enforcement changes

Then the LLM output format may vary and parsing logic may require
adjustment.

------------------------------------------------------------------------

## Simulated Dataset

The file `data/audit_simulated_access.log` was generated to simulate an
audit scenario including:

-   Standard employee users (`u-`)
-   UNIX administrators (`a-`)
-   Windows administrators (`x-`)
-   Oracle administrators (`o-`)
-   Shared accounts (`s-`)
-   Technical accounts (`t-`)

A small number of deliberate outliers were introduced:

-   Some `u-` users granted administrative group membership
-   Selected shared or technical accounts assigned privileged roles

These intentional deviations validate the anomaly detection capability
of the knowledge graph.

------------------------------------------------------------------------

## Installation & Operation

For installation and operational details, refer to:

`README-Original-Author.md`

------------------------------------------------------------------------

## Attribution

This project is based on:

https://github.com/robert-mcdermott/ai-knowledge-graph.git

All original structural and visualization components belong to the
original author.

This fork extends the project with:

-   LLM-based semantic enrichment
-   Security-focused anomaly detection
-   Enhanced filtering logic

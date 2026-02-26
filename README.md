# AI-Enhanced Knowledge Graph for Security Log Analysis

I explored how AI-driven graph modeling can enhance privileged access governance and control monitoring in regulated environments.

![Example -- Potential Policy Breach
Identified](docs/example-breach.png)

> **Figure 1 -- Structural privilege deviation detected via graph analysis.**\
> Users labelled with prefix `u-` represent standard (non-privileged)
> accounts.\
> In this example, certain `u-` users are connected to the
> `unix system administrators` group.\
> Standard users should not normally be granted UNIX or other
> administrative privileges.\
> Under normal access governance principles, such relationships should not exist.
> The knowledge graph highlights these structural anomalies for investigation.
> These relationships therefore represent potential deviations from
> access control policy.

------------------------------------------------------------------------

## Executive Summary

This project explores how Large Language Models (LLMs) combined with graph-based modeling can enhance the detection of privilege misconfigurations in enterprise environments.

Traditional log monitoring focuses on event-level anomalies.
This approach focuses on structural anomalies in identity relationships.

The objective is to:

- Transform semi-structured audit logs into a semantic knowledge graph

- Automatically classify identity types and roles

- Detect deviations from expected privilege models

- Improve transparency in access governance oversight

This is a research-oriented prototype designed to demonstrate how AI can augment identity governance and privileged access monitoring, simplifying auditors work.

------------------------------------------------------------------------

## Strategic Context

In regulated financial environments, privileged access risk remains one of the most critical control domains.

Challenges include:

- Role sprawl across heterogeneous systems

- Privilege creep over time

- Shared and technical accounts inheriting excessive permissions

- Limited visibility into cross-domain relationships

- This project demonstrates how:

- LLM-assisted log interpretation

- Graph-based relationship modeling

- Interactive filtering

can collectively enhance visibility into structural policy violations.

------------------------------------------------------------------------

🚀 Try It Live

An interactive version of the knowledge graph is available:

👉 Open 👉 **[Open Interactive Knowledge Graph](https://massimotamos.github.io/ai-knowledge-graph/audit_simulated_access-kg.html)**

What to Expect in the Browser

Once opened, you will be able to:

🔍 Zoom and pan across the full graph

🧭 Select individual nodes to inspect relationships

🎯 Use the enhanced filtering combobox to:

Filter users by prefix (u-, a-, x-, o-, s-, t-)

Apply operators such as:

StartsWith

Not StartsWith

Contains

Not Contains

Isolate administrative group memberships

🔎 Identify structural deviations such as:

Standard users (u-) assigned to administrative groups

Shared or technical accounts holding privileged roles

Unexpected cross-system access relationships

The visualization is fully client-side and does not require backend services.
All analysis is performed locally within the browser.
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

# 各縣市舉債及市長選舉關係 ＆ 各縣市議員前科及選舉狀況
Data Visualization Final Project using D3.js

## Overview
Analyze the vote of the mayor and the numerical change of the national debt
Analyze the vote of the councilor and list out all the criminal record if exists

## Data and Data Processing

1. MayorElect.csv(縣市長選舉資料)
2. Debt.csv(各縣市債務鐘)
3. CouncilorElect.csv(縣市議員選舉資料)
4. CouncilCrime.csv(現任市議員前科總覽)

## Visualization Design Sketch

## File structure
- index_mayor.ts
- index_council.ts
- raw_data: do not use
- clean_data: read files inside to get data
- component: common vue components
- mayor_graph: D3.js that draws graph for mayor
- council_graph: D3.js that draws graph for council

## Work breakdown

|First Cycle|Done||
|:---:|:---|:---:|
|Data Preparation|grab the required data|Beck049|
||clean the data|Beck049|
|Draw a Taiwan Map|separate by every areas|Beck049|
||animation when hover on section|Beck049|
||a point to place graph (or point)||

|Second Cycle||||
|:---:|:---|:---:|---:|
|Mayor & debt|Mayor basic data||
||vote rate |pie chart|
||debt change of the term |line chart|
||small graph of the debt change|bar chart scattered on map|
||all year debt change, categorized by term|line chart|
||compare of multiple area's total debt change|line chart|
||||
|Councilor & crime record|seats of every party|pie chart|
||votes of every party|bar chart|
||lists of councilor's criminal record|table|Beck049|
||a point that its size display the criminal councilor|point scatter on map| 
||History change of the party seats||

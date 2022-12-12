# 各縣市舉債及市長選舉關係 ＆ 各縣市議員前科及選舉狀況
Data Visualization Final Project using D3.js

## Overview
Analyze the vote of the mayor and the numerical change of the national debt
Analyze the vote of the councilor and list out all the criminal record if exists

## Data and Data Processing

1. (直轄市長選舉資料)
2. (市長選舉資料)
3. (各縣市債務鐘)
4. (直轄市議員選舉資料)
5. (市議員選舉資料)
6. (現任市議員前科總覽)

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

|First Cycle|||
|:---:|:---|:---:|
|Data Preperation|grab the required data||
||clean the data||
|Draw a Taiwan Map|seperate by every areas||
||animation when hover on section||
||a point to place graph (or point)||

|Second Cycle|||
|:---:|:---|:---:|
|Mayor & debt|Mayor basic data||
||vote rate |pie chart|
||debt change of the trem |line chart|
||small gragh of the debt change|bar chart scattered on map|
||all year debt change, categorized by term|line chart|
||compare of multiple area's total debt change|line chart|
||||
|Councilor & crime record|seats of every party|pie chart|
||votes of every party|bar chart|
||lists of councilor's criminal record|table|
||a point that its size display the cirminal councilor|point scatter on map| 
||History change of the party seats||

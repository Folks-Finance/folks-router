import { Grid, Col } from "@tremor/react";

import { HistogramChartCard } from "@components/chart-cards/histogram-chart-card";
import { LineChartCard } from "@components/chart-cards/line-chart-card";

const histogramChartData = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
];

const lineChartdata = [
  {
    year: 1970,
    "Export Growth Rate": 2.04,
    "Import Growth Rate": 1.53,
  },
  {
    year: 1971,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.58,
  },
  {
    year: 1972,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1973,
    "Export Growth Rate": 1.93,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1974,
    "Export Growth Rate": 1.88,
    "Import Growth Rate": 1.67,
  },
];

const histogramChartData2 = [
  {
    name: "Topic 1",
    "Group A": 890,
    "Group B": 338,
    "Group C": 538,
    "Group D": 396,
    "Group E": 138,
    "Group F": 436,
  },
  {
    name: "Topic 2",
    "Group A": 289,
    "Group B": 233,
    "Group C": 253,
    "Group D": 333,
    "Group E": 133,
    "Group F": 533,
  },
];

export const MetricsDashboard = () => {
  return (
    <div className="layout-container flex flex-col gap-y-10 pt-3.5 tablet:gap-y-16 tablet:pt-5">
      <h1 className="text-center text-3xl font-semibold text-base-content tablet:text-4xl">Folks Router Metrics</h1>

      <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-6">
        <Col>
          <HistogramChartCard
            title="Lorem ipsum dolor sit amet"
            subtitle="Nam sit amet justo nulla. Quisque at ante lacus. Proin fringilla, ex accumsan rhoncus finibus, quam purus feugiat nisi, at dictum enim arcu vel nisi."
            index="name"
            data={histogramChartData}
            categories={["Number of threatened species"]}
            colors={["teal"]}
          />
        </Col>
        <Col>
          <LineChartCard
            title="Lorem ipsum dolor sit amet"
            subtitle="Nam sit amet justo nulla. Quisque at ante lacus. Proin fringilla, ex accumsan rhoncus finibus, quam purus feugiat nisi, at dictum enim arcu vel nisi."
            index="year"
            data={lineChartdata}
            categories={["Export Growth Rate", "Import Growth Rate"]}
            colors={["amber", "rose"]}
          />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          <HistogramChartCard
            index="name"
            data={histogramChartData2}
            categories={["Group A", "Group B", "Group C", "Group D", "Group E", "Group F"]}
            colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
          />
        </Col>
      </Grid>
    </div>
  );
};

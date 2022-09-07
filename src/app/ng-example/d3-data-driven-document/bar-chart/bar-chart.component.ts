import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  private data = [
    { "Product": "iPhone 6s", "SoldUnit": "236", "Released": "2010" },
    { "Product": "iPhone 12 mini", "SoldUnit": "150", "Released": "2022" },
    { "Product": "iPhone 13", "SoldUnit": "390", "Released": "2021" },
    { "Product": "iPhone 12 Pro", "SoldUnit": "244", "Released": "2021" },
    { "Product": "iPhone 11", "SoldUnit": "122", "Released": "2019" },
  ];
  private svg: any;
  private margin = 100;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Product))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + (this.height) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "14px");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 500])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: { Product: string; }) => x(d.Product))
      .attr("y", (d: { SoldUnit: d3.NumberValue; }) => y(d.SoldUnit))
      .attr("width", x.bandwidth())
      .attr("height", (d: { SoldUnit: d3.NumberValue; }) => this.height - y(d.SoldUnit))
      .attr("fill", "#d04a35");
  }

}

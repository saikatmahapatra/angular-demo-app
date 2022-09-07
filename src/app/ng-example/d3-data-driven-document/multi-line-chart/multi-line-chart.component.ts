import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.scss']
})
export class MultiLineChartComponent implements OnInit {
  private svg: any;
  private data = [
    {
      name: "USA",
      values: [
        { date: "2000", price: "100" },
        { date: "2001", price: "110" },
        { date: "2002", price: "145" },
        { date: "2003", price: "241" },
        { date: "2004", price: "101" },
        { date: "2005", price: "90" },
        { date: "2006", price: "10" },
        { date: "2007", price: "35" },
        { date: "2008", price: "21" },
        { date: "2009", price: "201" }
      ]
    },
    {
      name: "Canada",
      values: [
        { date: "2000", price: "200" },
        { date: "2001", price: "120" },
        { date: "2002", price: "33" },
        { date: "2003", price: "21" },
        { date: "2004", price: "51" },
        { date: "2005", price: "190" },
        { date: "2006", price: "120" },
        { date: "2007", price: "85" },
        { date: "2008", price: "221" },
        { date: "2009", price: "101" }
      ]
    },
    {
      name: "Maxico",
      values: [
        { date: "2000", price: "50" },
        { date: "2001", price: "10" },
        { date: "2002", price: "5" },
        { date: "2003", price: "71" },
        { date: "2004", price: "20" },
        { date: "2005", price: "9" },
        { date: "2006", price: "220" },
        { date: "2007", price: "235" },
        { date: "2008", price: "61" },
        { date: "2009", price: "10" }
      ]
    }
  ];

  private width = 500;
  private height = 300;
  private margin = 50;
  private duration = 250;

  private lineOpacity = "0.25";
  private lineOpacityHover = "0.85";
  private otherLinesOpacityHover = "0.1";
  private lineStroke = "1.5px";
  private lineStrokeHover = "2.5px";

  private circleOpacity = '0.85';
  private circleOpacityOnLineHover = "0.25"
  private circleRadius = 3;
  private circleRadiusHover = 6;

  private date: any;
  private price: any;
  private xScale: any;
  private yScale: any;
  private color: any;
  private line: any;
  private lines: any;
  private xAxis: any;
  private yAxis: any;
  constructor() { }

  ngOnInit(): void {
    this.formatData(this.data);
    this.createSvg();
  }

  private formatData(data: Array<any>) {
    let parseDate = d3.timeParse("%Y");
    this.data.forEach(function (d: any) {
      d.values.forEach(function (item: any) {
        item.date = parseDate(item.date);
        item.price = +item.price;
      });
    });
    this.xScale = d3.scaleTime()
      //.domain(d3.extent(this.data[0].values, x => x.date))
      .range([0, this.width - this.margin]);

    this.yScale = d3.scaleLinear()
      //.domain([0, d3.max(this.data[0].values, x => x.price)])
      .range([this.height - this.margin, 0]);

    this.color = d3.scaleOrdinal(d3.schemeCategory10);
  }

  private createSvg(): void {
    this.svg = d3.select("#saikat").append("svg")
      .attr("width", (this.width + this.margin) + "px")
      .attr("height", (this.height + this.margin) + "px")
      .append('g')
      .attr("transform", `translate(${this.margin}, ${this.margin})`);
  }



}

import React from "reactn";
import "./StatGraph.css";
import apiCall from "../../util/api.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default class StatGraph extends React.PureComponent {
	state = {
		year: "20182019",
		stat: "points",
		career: this.global.player.stats[0].splits.reverse(),
		final: 0
	}

	callChart = (stat, year) => {
		apiCall.getGameStats(this.props.player, year).then(games => {
			let chart = am4core.create("chartdiv", am4charts.XYChart);
			let season = games.data.people[0].stats[0].splits;
			let data = [];
			let stats = 0;
			let final = 0;
			for (let i = season.length-1; i > -1; i--) {
				let date = season[i].date.split("-");
				// Separate goalies vs forwards/d-men
				if (season[i].stat.evenSaves) {
					switch(stat) {
						case "savePercentage":
							stats = season[i].stat.savePercentage;
							final+= season[i].stat.savePercentage;
							break;
						case "goalsAgainst":
							stats = season[i].stat.goalsAgainst;
							final+=season[i].stat.goalsAgainst;
							break;
						case "shotsAgainst":
							stats+=season[i].stat.shotsAgainst;
							final+=season[i].stat.shotsAgainst;
							break;
						case "saves":
							stats+=season[i].stat.saves;
							final+=season[i].stat.saves;
							break;
					}
				} else {
					switch(stat) {
						case "goals":
							stats+=season[i].stat.goals;
							final+=season[i].stat.goals;
							break;
						case "assists":
							stats+=season[i].stat.assists;
							final+=season[i].stat.assists;
							break;
						case "points":
							stats+=season[i].stat.points;
							final+=season[i].stat.points;
							break;
						case "shotPct":
							stats = season[i].stat.shotPct;
							// Deals with undefined results
							if (season[i].stat.shotPct) {
								final+= season[i].stat.shotPct;
							} else {
								final+=0;
							}
							break;
						case "plusMinus":
							stats+=season[i].stat.plusMinus;
							final+= season[i].stat.plusMinus;
							break;
						default:
							stats+=season[i].stat.points;
							final+=season[i].stat.points;
							break;
					}
				}
				data.push({
					date: new Date(parseInt(date[0]), (parseInt(date[1])-1), parseInt(date[2])), name: "name", value: stats
				})
			}
			if (stat == "savePercentage" || stat == "goalsAgainst" || stat == "shotPct" || stat == "plusMinus") {
				switch (stat) {
					case "savePercentage":
						final = (final/season.length).toFixed(3);
						break;
					case "plusMinus":
						final = Math.round(final/season.length);
						break;
					default:
						final = (final/season.length).toFixed(2);
						break;
				}
			}
			this.setState({
				final: final
			})
			chart.data = data;

		    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		    dateAxis.renderer.grid.template.location = 0;

		    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		    valueAxis.tooltip.disabled = true;
		    valueAxis.title.text = stat.toUpperCase();
		    valueAxis.renderer.minWidth = 35;

		    let series = chart.series.push(new am4charts.LineSeries());
		    series.dataFields.dateX = "date";
		    series.dataFields.valueY = "value";

		    series.tooltipText = `{valueY.value}`;
		    chart.cursor = new am4charts.XYCursor();

		    // let scrollbarX = new am4charts.XYChartScrollbar();
		    // scrollbarX.series.push(series);
		    // chart.scrollbarX = scrollbarX;

		    this.chart = chart;
		})
	}

	componentDidMount() {
		// Show points on skater, Sv% on goalie
		if (this.state.career[0].stat.evenSaves) {
			this.callChart("savePercentage", this.state.year);
		} else {
			this.callChart("points", this.state.year);
		}
		
	}

	componentWillUnmount() {
	    if (this.chart) {
	      this.chart.dispose();
	    }
	}

	changeStat = event => {
		this.callChart(event.target.value, this.state.year);
		this.setState({
			stat: event.target.value
		})
	}

	changeYear = event => {
		this.callChart(this.state.stat, event.target.value)
		this.setState({
			year: event.target.value
		})
	}

	render() {
		return (
			<div className="chart-area">
				<div className="btn-group" role="group" aria-label="Basic example">
					{this.state.career[0].stat.evenSaves ? 
						<div>
							<button type="button" onClick={this.changeStat} value="savePercentage" className="btn btn-secondary">Sv%</button>
						    <button type="button" onClick={this.changeStat} value="goalsAgainst" className="btn btn-secondary">GAA</button>
						    <button type="button" onClick={this.changeStat} value="shotsAgainst" className="btn btn-secondary">SA</button>
						    <button type="button" onClick={this.changeStat} value="saves" className="btn btn-secondary">Saves</button>
						</div>
					:
						<div>
							<button type="button" onClick={this.changeStat} value="points" className="btn btn-secondary">Points</button>
						    <button type="button" onClick={this.changeStat} value="goals" className="btn btn-secondary">Goals</button>
						    <button type="button" onClick={this.changeStat} value="assists" className="btn btn-secondary">Assists</button>
						    <button type="button" onClick={this.changeStat} value="shotPct" className="btn btn-secondary">Shot %</button>
						    <button type="button" onClick={this.changeStat} value="plusMinus" className="btn btn-secondary">+/-</button>
						</div>
					}
				    <button type="button" className="btn btn-secondary disabled">Season:</button>
					<select onChange={this.changeYear} className="year-select">
						{this.state.career.filter(year => year.league.name === "National Hockey League").map((year,index) => (
							<option key={index} value={year.season}>{year.season}</option>
				  		))}
				  	</select>
				  	<button type="button" className="btn btn-secondary disabled">Season Total: </button>
				  	<button type="button" className="btn btn-primary disabled">{this.state.final}</button>
				</div>
				<div className="chartdiv"></div>
			</div>
		)
	}
}
"use client";
import { Flex } from "@radix-ui/themes";
import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

type Competency = {
	id: string;
	skills: Skill[];
};

type Skill = {
	id: string;
	name: string;
};

interface Props {
	competency: Competency;
}

const BarChart = ({ competency }: Props) => {
	const chartRef = useRef(null);
	const chartCompetency = competency;
	const labels = [""];
	const values = [3];
	chartCompetency.skills.map((skill) => labels.push(skill.name));
	chartCompetency.skills.map((skill) => values.push(Math.random() * 4 + 1));

	useEffect(() => {
		if (chartRef.current) {
			if (chartRef.current.chart) {
				chartRef.current.chart.destroy();
			}
		}

		const context = chartRef.current.getContext("2d");
		const newChart = new Chart(context, {
			type: "radar",
			data: {
				labels: labels,
				datasets: [
					{
						data: values,
						backgroundColor: "rgba(0,0,0,0)",
						borderColor: "bg-primary",
						borderWidth: 2,
					},
				],
			},
			options: {
				plugins: {
					legend: {
						display: false,
					},
				},
				responsive: true,
				scales: {
					r: {
						ticks: {
							display: false,
						},
						angleLines: {
							display: false,
						},
						suggestedMin: 0,
						suggestedMax: 4,
					},
				},
			},
		});
		chartRef.current.chart = newChart;
	});

	return (
		<Flex
			justify={"center"}
			style={{ position: "relative", width: "auto", height: "250px" }}
		>
			<canvas ref={chartRef} />
		</Flex>
	);
};

export default BarChart;

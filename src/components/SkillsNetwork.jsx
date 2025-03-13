import { useEffect, useRef } from "react";
import * as d3 from "d3";

const skills = [
  { name: "Python", category: "Programming", related: ["pandas", "NumPy", "scikit-learn", "Django"] },

  { name: "Rust", category: "Programming", related: ["Kubernetes"] },
  { name: "R", category: "Programming", related: [] },
  { name: "SQL", category: "Programming", related: ["PostgreSQL", "SQLite", "MongoDB"] },
  { name: "pandas", category: "ML & Data Science", related: ["Python", "NumPy"] },
  { name: "NumPy", category: "ML & Data Science", related: ["Python", "pandas", "scikit-learn"] },
  { name: "scikit-learn", category: "ML & Data Science", related: ["Python", "NumPy", "XGBoost"] },
  { name: "XGBoost", category: "ML & Data Science", related: ["scikit-learn"] },
  { name: "AWS", category: "Development Tools", related: ["Kubernetes", "Git"] },
  { name: "Git", category: "Development Tools", related: ["Kubernetes"] },
  { name: "PostgreSQL", category: "Databases", related: ["SQL", "Django"] },
  { name: "React", category: "Web Development", related: ["Next.js", "Tailwind CSS"] },
  { name: "Next.js", category: "Web Development", related: ["React"] },
  { name: "Django", category: "Web Development", related: ["Python", "PostgreSQL"] },
    { name: "Kubernetes", category: "Development Tools", related: ["AWS", "Rust"] },
    { name: "SQLite", category: "Databases", related: ["SQL"] },
    {name: "MongoDB", category: "Databases", related: ["SQL"]},
    { name: "Tailwind CSS", category: "Web Development", related: ["React"] },
];

const categories = [...new Set(skills.map(skill => skill.category))];
const nodes = skills.map(skill => ({ id: skill.name, group: categories.indexOf(skill.category) }));
const links = skills.flatMap(skill => skill.related.map(related => ({ source: skill.name, target: related })));

export default function SkillsNetwork() {
  const svgRef = useRef();

  useEffect(() => {
    const width = 2000, height = 1400;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "100%");

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide().radius(40))
      .alphaDecay(0.03)
      .alphaMin(0.002);

    const link = svg.append("g")
      .attr("stroke", "#bbb")
      .attr("stroke-opacity", 0.7)
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", 15)
      .attr("fill", d => d3.schemeCategory10[d.group % 10])
      .call(drag(simulation));

    const text = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text(d => d.id)
      .attr("font-size", "1.4rem")
      .attr("dx", 18)
      .attr("dy", 5)
      .style("fill", "#eee")
      .style("stroke", "none");

    function boundingBox(d) {
      d.x = Math.max(-width / 2 + 30, Math.min(width / 2 - 30, d.x));
      d.y = Math.max(-height / 2 + 30, Math.min(height / 2 - 30, d.y));
    }

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.each(boundingBox)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      text.each(boundingBox)
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

  }, []);

  function drag(simulation) {
    return d3.drag()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
  }

  return <svg ref={svgRef}></svg>;
}

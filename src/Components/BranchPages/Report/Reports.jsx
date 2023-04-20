import React from "react";
import PageNav from "../PageNav";
import styled from "./Reportstyle.module.css";
import threeDot from "../../../assets/threeDot.svg";
import cross from "../../../assets/cross.svg";
import downArrow from "../../../assets/downArrow.svg";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  CustomizedAxisTick,
} from "recharts";

function Reports() {
  // const CustomizedAxisTick = (props) => {
  //   const {x, y, payload} = props;
  //   return (
  //     <g transform={`translate(${x},${y})`}>
  //       <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
  //     </g>
  //   );
  // };
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 3000,
      amt: 2500,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 2800,
      amt: 3290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 9908,
      amt: 4000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  let colors = ["#36F097", "#1ED6FF", "#268AFF"];
  let labels = ["uv", "pv", "amt"];
  let totalTask = [
    "Completed tasks",
    "Overdue tasks",
    "Total tasks",
    "Assigned tasks",
    "Shared tasks",
  ];
  return (
    <>
      <PageNav></PageNav>
      <div style={{ margin: "2rem 0rem", display: "flex", gap: "2rem" }}>
        {totalTask.map((ele, ind) => {
          return (
            <div className={styled.taskContainer}>
              <div
                style={{
                  height: "4rem",
                  padding: "0rem 1rem",
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "1.4rem",
                    alignItems: "center",
                  }}
                >
                  {ele}{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "2rem",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <img src={threeDot} alt="cross" />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <img src={cross} alt="cross" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styled.taskSubContainer}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1.5rem",
                  }}
                >
                  <div style={{ fontSize: "2.2rem", color: "#fff" }}>10</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1.5rem",
                  }}
                >
                  <div className={styled.calenderHeaderMonth}>
                    <div>Project name</div>
                    <div>
                      <img src={downArrow} alt="sddsdsd" />
                    </div>
                  </div>
                  <div className={styled.calenderHeaderMonth}>
                    <div>Domain name</div>
                    <div>
                      <img src={downArrow} alt="sddsdsd" />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
                  Performance KPI
                </div>
                <div style={{ marginTop: "1.5rem", fontSize: "1rem" }}>
                  Completion rate:
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className={styled.AreaChart}>
            <div></div>
            <div
              style={{
                height: "5rem",
                padding: "1rem",
                fontSize: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "1.4rem",
                  alignItems: "center",
                }}
              >
                Task by completion status
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "2rem",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img src={threeDot} alt="cross" />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <img src={cross} alt="cross" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styled.AreaChartSub1}>
              {/* <ResponsiveContainer width="100%" height="100%"> */}
              <BarChart
                width={580}
                height={270}
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid opacity={0.2} />
                {/* <XAxis dataKey="name" tick={<CustomizedAxisTick />}/> */}
                <XAxis dataKey="name" height={45} width={100} />
                <YAxis width={20} />
                {/* <Tooltip /> */}
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
              {/* </ResponsiveContainer> */}

              {/* <div style={{display:"flex",width:"100%",alignItems:"center",gap:"1.5rem",justifyContent:"center",marginBottom:"1rem",fontSize:"1rem"}}>
            {labels.map((ele,ind)=>{
                return <div style={{display:"flex", }}>
               <div style={{display:"flex",gap:".3rem",alignItems:"center" }}>
               <div style={{width:".8rem",height:".8rem",border:".5px solid ",backgroundColor:`${colors[ind]}`}}></div>
               <div>{ele}</div>
               </div>
                </div>
            })}
         </div> */}
            </div>
          </div>
          <div className={styled.AreaChart}>
            <div></div>
            <div
              style={{
                height: "5rem",
                padding: "1rem",
                fontSize: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "1.4rem",
                  alignItems: "center",
                }}
              >
                Task by completion status
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "2rem",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img src={threeDot} alt="cross" />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <img src={cross} alt="cross" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styled.AreaChartSub}>
              <ResponsiveContainer width="100%" height="92.5%">
                <AreaChart
                  width={580}
                  height={260}
                  data={data}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <CartesianGrid opacity={0.2} />

                  <XAxis dataKey="name" height={55} width={100} />
                  <YAxis width={28} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stackId="1"
                    stroke="#36F097"
                    fill="#36F097"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stackId="1"
                    stroke="#1ED6FF"
                    fill="#1ED6FF"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="amt"
                    stackId="1"
                    stroke="#268AFF"
                    fill="#268AFF"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  gap: "1.5rem",
                  justifyContent: "center",
                  marginBottom: "3rem",
                  fontSize: "1rem",
                }}
              >
                {labels.map((ele, ind) => {
                  return (
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: ".3rem",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "1.4rem",
                            height: "1.1rem",
                            border: ".5px solid ",
                            backgroundColor: `${colors[ind]}`,
                          }}
                        ></div>
                        <div style={{ fontSize: ".8rem" }}>{ele}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;

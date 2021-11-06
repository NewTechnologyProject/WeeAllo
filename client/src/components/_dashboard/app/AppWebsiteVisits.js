import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@material-ui/core";
//
import { BaseOptionChart } from "../../charts";
import Carousel from "react-elastic-carousel";

// ----------------------------------------------------------------------

export default function AppWebsiteVisits() {
  const items = [
    { id: 1, src: "/static/mock-images/avatars/img1.jpg" },
    { id: 2, src: "/static/mock-images/avatars/img2.jpg" },
  ];
  return (
    <Card style={{ height: 600 }}>
      <CardHeader />
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Chào mừng đến với Weallo!{" "}
      </Typography>
      <small style={{ marginLeft: "100px" }}>
        Khám phá những tiện ích hỗ trợ trò chuyện và làm việc cùng người thân
        bạn bè và đồng nghiệp
      </small>
      <Carousel>
        {items.map((item) => (
          <img key={item.id} src={item.src} />
        ))}
      </Carousel>
    </Card>
  );
}

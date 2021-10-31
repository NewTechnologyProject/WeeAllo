import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, Typography } from "@material-ui/core";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

export default function AppWebsiteVisits() {
  return (
    <Card>
      <CardHeader />
      <Typography variant="h4" style={{ textAlign: "center" }}>
        Chào mừng đến với Weallo!{" "}
      </Typography>
      <small style={{ marginLeft: "100px" }}>
        Khám phá những tiện ích hỗ trợ trò chuyện và làm việc cùng người thân
        bạn bè và đồng nghiệp
      </small>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="/static/mock-images/avatars/img1.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="/static/mock-images/avatars/img2.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="/static/mock-images/avatars/img3.png"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </Card>
  );
}

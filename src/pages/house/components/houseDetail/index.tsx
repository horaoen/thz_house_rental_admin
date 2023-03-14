import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Carousel, Descriptions, Divider } from "antd";
import axios from "axios";
import styles from "./index.module.css";
import ReactPlayer from "react-player";

export const HouseDetail: React.FC = () => {
  const { houseId } = useParams();
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

  const carouselList = data?.imageUrls?.map((url: any) => {
    return <img src={url} alt="img" className={styles.carouseImage} />;
  });

  async function fetchData() {
    const response = await axios.get(`/house/get/${houseId}`);
    const res = response.data.data;
    setData(res);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.detailContainer}>
      <Button
        type="primary"
        onClick={() => {
          navigate(-1);
        }}
        style={{
          position: "relative",
          top: "10px",
          left: "20px",
        }}
      >
        返回
      </Button>
      <Carousel autoplay className={styles.carouse}>
        {carouselList}
      </Carousel>

      <ReactPlayer
        style={{ margin: "0 auto" }}
        url={data?.mp4Urls[0]}
        controls={true}
        muted={true}
      />

      <div
        style={{ paddingInline: "10%", marginTop: "40px", marginBottom: "" }}
      >
        <Descriptions layout="horizontal" bordered size="middle">
          <Descriptions.Item label="价格">{data?.price}</Descriptions.Item>
          <Descriptions.Item label="位置" span={2}>
            {data?.location}
          </Descriptions.Item>
          <Descriptions.Item label="面积">{data?.area}</Descriptions.Item>
          <Descriptions.Item label="类型">{data?.type}</Descriptions.Item>
          <Descriptions.Item label="户型">{data?.houseType}</Descriptions.Item>
          <Descriptions.Item label="租期">{data?.leaseTerm}</Descriptions.Item>
          <Descriptions.Item label="押金">{data?.deposit}</Descriptions.Item>
          <Descriptions.Item label="楼层">{data?.floor}</Descriptions.Item>
          <Descriptions.Item label="收藏数量">
            {data?.collectNum}
          </Descriptions.Item>
          <Descriptions.Item label="喜欢数量">
            {data?.likeNum}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions
          style={{ marginTop: "20px" }}
          layout="vertical"
          bordered
          size="middle"
        >
          <Descriptions.Item label="详情描述" span={3}>
            {data?.description}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

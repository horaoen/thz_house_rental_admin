import { Slider, InputNumber } from "antd";
import { useState } from "react";

interface PropType {
  value: { minPrice: number; maxPrice: number };
  onChange: Function;
  min?: number;
  max?: number;
}

export const PriceRangeSelector: React.FC<PropType> = ({
  value,
  onChange,
  min,
  max,
}) => {
  const [minPrice, setMinPrice] = useState(value.minPrice);
  const [maxPrice, setMaxPrice] = useState(value.maxPrice);

  const handleMinPriceChange = (value: any) => {
    setMinPrice(value);
    onChange([value, maxPrice]);
  };

  const handleMaxPriceChange = (value: any) => {
    setMaxPrice(value);
    onChange([minPrice, value]);
  };

  const handleSliderChange = (value: number[]) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
    onChange(value);
  };

  return (
    <div>
      <Slider
        range
        max={max ? max : 5000}
        min={min ? min : 100}
        value={[minPrice, maxPrice]}
        onChange={handleSliderChange}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <InputNumber
          min={0}
          max={maxPrice}
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <InputNumber
          min={minPrice}
          max={10000}
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

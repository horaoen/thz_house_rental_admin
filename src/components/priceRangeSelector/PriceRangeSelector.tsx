import { Slider, InputNumber } from "antd";
import { useEffect } from "react";

interface PropType {
  values: { minPrice: number; maxPrice: number };
  onChange: Function;
  min?: number;
  max?: number;
}

export const PriceRangeSelector: React.FC<PropType> = ({
  values,
  onChange,
  min,
  max,
}) => {
  const handleMinPriceChange = (value: any) => {
    onChange({
      ...values,
      minPrice: value,
    });
  };

  const handleMaxPriceChange = (value: any) => {
    onChange({
      ...values,
      maxPrice: value,
    });
  };

  const handleSliderChange = (value: number[]) => {
    onChange({
      minPrice: value[0],
      maxPrice: value[1],
    });
  };

  return (
    <div>
      <Slider
        range
        max={max ? max : 10000}
        min={min ? min : 100}
        value={[values.minPrice, values.maxPrice]}
        onChange={handleSliderChange}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <InputNumber
          min={10}
          value={values.minPrice}
          onChange={handleMinPriceChange}
        />
        <InputNumber
          max={10000}
          value={values.maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

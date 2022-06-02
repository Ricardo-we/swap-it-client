import React, { useEffect, useState } from "react";
import { getTagsRequest } from "../services/tag-requests";
import Select from "react-select";

interface TagSelectProps extends React.HTMLProps<HTMLSelectElement> {
  name?: string;
  defaults?: any[];
  onChange?: (data: any) => void | any;
}

function TagSelect({ name, defaults, onChange, ...props }: TagSelectProps) {
  const [tags, setTags] = useState<Array<any>>();

  const getTags = () => {
    return getTagsRequest().then((res) => setTags(res));
  };

  const handleChange = (e: any) => {
    onChange && onChange(e);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <Select
        isMulti
        onChange={handleChange}
        defaultValue={defaults ? defaults : []}
        options={
          tags && tags?.map((tag) => ({ value: tag.id, label: tag.name }))
        }
      />
    </>
  );
}

export default TagSelect;

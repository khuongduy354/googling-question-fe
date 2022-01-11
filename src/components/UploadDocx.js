import { useState, Fragment } from "react";
import axios from "axios";
const UploadDocx = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [searchList, setSearchList] = useState([]);
  const [beginCount, setBeginCount] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await axios.post(
        "http://localhost:8000" + "/formatDoc",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSearchList(res.data.searchList);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = () => {
    for (let i = beginCount; i <= beginCount + 5; i++) {
      const url = searchList[i];
      window.open(url, "_blank");
    }
    setBeginCount(beginCount + 6);
  };
  const renderSearchList = () => {
    return (
      <Fragment>
        <button onClick={handleSearch}>click to search</button>
        {searchList.map((list, index) => (
          <a style={{ display: "block" }} href={list} target={"_blank"}>
            Câu {index}
          </a>
        ))}
      </Fragment>
    );
  };
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>

      {searchList.length !== 0 && renderSearchList()}
    </Fragment>
  );
};

export default UploadDocx;

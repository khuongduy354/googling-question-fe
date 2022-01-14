import { useRef, useState, Fragment } from "react";
import { fetchFormatDoc } from "../api/fetchFormatDoc";
import { fetchScrape } from "../api/fetchScrape";
const UploadDocx = () => {
  const [scrapeMode, setScrapeMode] = useState(false);
  const keyword = useRef("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
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
    form.append("keyword", keyword.current.value);
    try {
      if (scrapeMode) {
        const res = await fetchScrape(form);
        setSearchList(res.data.solutionList);
      } else {
        const res = await fetchFormatDoc(form);
        setSearchList(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderSearchList = () => {
    const handleSearch = () => {
      for (let i = beginCount; i <= beginCount + 5; i++) {
        const url = searchList[i];
        window.open(url, "_blank");
      }
      setBeginCount(beginCount + 6);
    };
    return (
      <Fragment>
        <button onClick={handleSearch}>click to search</button>
        <p>
          Search from: {beginCount} to {beginCount + 5}{" "}
        </p>
        {searchList.length !== 0 &&
          searchList.map((list, index) => (
            <a style={{ display: "block" }} href={list} target={"_blank"}>
              Câu {index + 1}
            </a>
          ))}
      </Fragment>
    );
  };
  const renderSuggestedSolutions = () => {
    console.log(searchList);
    const renderSuggestedSolution = (content) => {
      return (
        <Fragment>
          <ul>
            {content.options.map((option) => (
              <li>{option}</li>
            ))}
          </ul>
          <h1>{content.correct}</h1>
          <h1> {content.explain}</h1>
        </Fragment>
      );
    };
    return (
      <Fragment>
        {searchList.map((item, index) => (
          <Fragment>
            <a
              style={{ display: "block" }}
              href={item.searchLink}
              target={"_blank"}
            >
              Câu {index + 1}: {item.originalQuestion}
            </a>
            {item.scrapeLink && <a href={item.scrapeLink}>Nguồn kết quả</a>}
            {/* {item.content !== "" && renderSuggestedSolution(item.content)} */}
          </Fragment>
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
          required={true}
          type="text"
          defaultValue={"câu"}
          placeholder="insert keyword"
          ref={keyword}
        />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
        <label style={{ display: "block", paddingTop: "30px" }}>
          Auto Scrape Mode{" "}
          {scrapeMode &&
            "( thử nghiệm, độ chính xác thấp, lâu, cân nhắc khi chọn )"}
        </label>
        <input
          onClick={() => setScrapeMode(!scrapeMode)}
          checked={scrapeMode}
          type="radio"
          value="Auto scrape"
        />
      </form>

      {/*  {searchList.length !== 0 && !scrapeMode && renderSearchList()} */}
      {scrapeMode && searchList.length !== 0 && renderSuggestedSolutions()}
    </Fragment>
  );
};

export default UploadDocx;

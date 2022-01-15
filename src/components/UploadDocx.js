import { useRef, useState, Fragment, useEffect } from "react";
import { fetchFormatDoc } from "../api/fetchFormatDoc";
import { fetchScrape } from "../api/fetchScrape";
const UploadDocx = () => {
  const [scrapeMode, setScrapeMode] = useState(false);
  const keyword = useRef("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [searchList, setSearchList] = useState([]);
  const [beginCount, setBeginCount] = useState(1);
  const [endCount, setEndCount] = useState(5);
  useEffect(() => {
    if (beginCount < 1 || beginCount > searchList.length) {
      setBeginCount(1);
    }
    if (parseInt(beginCount) + 4 > searchList.length) {
      setEndCount(searchList.length);
    } else {
      setEndCount(parseInt(beginCount) + 4);
    }
  }, [beginCount, searchList]);
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
        setSearchList(res.data.questionList);

        console.log(searchList);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderSearchList = () => {
    const handleSearch = () => {
      for (let i = beginCount; i <= endCount; i++) {
        const url = searchList[i - 1];
        window.open(url, "_blank");
      }
      setBeginCount(beginCount + 5);
    };
    const handleSearchAll = () => {
      searchList.forEach((el) => window.open(el, "_blank"));
    };
    return (
      <Fragment>
        <button onClick={handleSearch}>click to search</button>
        <p>
          Search from:{" "}
          {
            <input
              type={"number"}
              value={beginCount}
              onChange={(e) => {
                setBeginCount(e.target.value);
              }}
            />
          }{" "}
          to{" "}
          {
            <input
              type={"number"}
              value={endCount}
              onChange={(e) => {
                setEndCount(e.target.value);
              }}
            />
          }{" "}
        </p>
        <button onClick={handleSearchAll}>Click to search all at once</button>
        {searchList.length !== 0 &&
          searchList.map((list, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={list}
              target={"_blank"}
            >
              Câu {index + 1}
            </a>
          ))}
      </Fragment>
    );
  };
  const renderSuggestedSolutions = () => {
    const renderSuggestedSolution = (content) => {
      return (
        <Fragment>
          <ul>
            {content.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
          <h3> {"->" + content.correct}</h3>
          <p>
            {" "}
            <strong>Explain </strong> {content.explain}
          </p>
        </Fragment>
      );
    };
    return (
      <Fragment>
        {searchList.map((item, index) => (
          <Fragment key={index}>
            <span style={{ display: "block" }}>
              <a href={item.searchLink} target={"_blank"}>
                Câu {index + 1}:{" "}
              </a>
              {item.originalQuestion}
            </span>

            {item.scrapeLink && <a href={item.scrapeLink}>Nguồn kết quả</a>}
            {item.content && renderSuggestedSolution(item.content)}
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

      {searchList.length !== 0 && !scrapeMode && renderSearchList()}
      {scrapeMode && searchList.length !== 0 && renderSuggestedSolutions()}
    </Fragment>
  );
};

export default UploadDocx;

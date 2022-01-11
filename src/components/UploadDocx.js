import { useState, Fragment } from "react";
const UploadDocx = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const readFile = (file) => {
    const fileHandler = (e) => {
      const url = e.target.result;
      console.log(url);
    };
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      fileHandler(e);
    });
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    readFile(file);
    e.preventDefault();
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
    </Fragment>
  );
};

export default UploadDocx;

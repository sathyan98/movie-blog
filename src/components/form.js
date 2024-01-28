import { useForm } from "react-hook-form";
const Form = () => {
  const { register, handleSubmit } = useForm();
  const storeData = (data) => {
    console.log("data", data);
    window.localStorage.setItem("blogs" + data?.title, JSON.stringify(data));
  };
  for (let key in localStorage) {
    console.log("keys", key);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(storeData)}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <label style={{ textAlign: "center" }}>Title</label>
          <input
            style={{ flexBasis: "10px" }}
            type="text"
            name="title"
            {...register("title")}
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            margin: "10px",
          }}
        >
          <label style={{ textAlign: "center" }}>Enter your Story</label>
          <textarea
            name="story"
            {...register("story")}
            style={{ flexBasis: "450px", flexShrink: "2" }}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <label>Written By</label>
          <input type="text" name="author" {...register("author")}></input>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;

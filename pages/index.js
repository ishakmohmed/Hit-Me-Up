import axios from "axios";

function Index({ posts }) {
  return (
    <div>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <h1 key={post._id}>{post.title}</h1>)}
    </div>
  );
}

Index.getInitialProps = async (ctx) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

  return { posts: res.data };
};

export default Index;
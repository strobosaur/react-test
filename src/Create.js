import { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('new post added');
      setIsPending(false);
    })
  }

  return ( 
    <div className="create">
      <h2>Add a new post</h2>
      <form onSubmit={handleSubmit}>
        <label>Post title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Post body</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Post author</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="luigi">luigi</option>
          <option value="yoshi">yoshi</option>
        </select>
        { !isPending && <button>New post</button>}
        { isPending && <button disabled>Posting...</button>}
      </form>
    </div>
   );
}
 
export default Create;
import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
  // const [blogs, setBlogs] = useState([
  //   { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
  //   { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
  //   { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'luigi', id: 3 }
  // ]);  
  
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  }

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then((result) => {
        if(!result.ok) {
          throw Error('No data in response');
        }
        return result.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        console.log(error.message);
        setIsPending(false);
        setError(error.message);
      })
  }, []);

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} />}
    </div>
   );
}
 
export default Home;
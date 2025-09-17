import React from 'react';
import { posts, addLike, searchPost, getProfilePosts } from '../service/api';
import Load from './Load';
import Commnet from './Comment';
import ReactDOM from 'react-dom/client';

export default function Profile(props) {
  const currentDate = new Date().toLocaleString();
  const [post1, setPost1] = React.useState({
    "time": currentDate,
    "user": props.props.email,
    likes: [],
    comments: []
  });
  const [fpost1, setFposts1] = React.useState([]);

  React.useEffect(() => {
    getProPost();
  }, []);

  function handleChange(event) {
    setPost1(old => ({
      ...old,
      [event.target.id]: event.target.value
    }));
  }

  const getProPost = async () => {
    showLoadingSpinner();
    try {
      const response = await getProfilePosts({"user": props.user});
      setFposts1(response.data);
    } finally {
      hideLoadingSpinner();
    }
  };

  const showLoadingSpinner = () => {
    const root = ReactDOM.createRoot(document.getElementById('load'));
    root.render(<Load />);
  };

  const hideLoadingSpinner = () => {
    const root = ReactDOM.createRoot(document.getElementById('load'));
    root.render(<></>);
  };

  function handleComments(event) {
    const root = ReactDOM.createRoot(document.getElementById('main'));
    root.render(<Commnet data={event} />);
  }

  async function handleLike(event) {
    await addLike({"id": event, "user": props.props.email});
    const response = await getProfilePosts({"user": props.user});
    setFposts1(response.data);
  }

  async function handleSearchPost() {
    try {
      const code = await searchPost(post1);
      setFposts1(code.response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }
  const getProfilePicture = () => {
    const defaultPicture = "https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    return (props.props.picture === "gfgh" || props.props.picture === defaultPicture) 
      ? "user.png" 
      : props.props.picture;
  };

  const renderLikeButton = (item) => {
    const isLiked = item.likes.find(item1 => item1 === props.props.email);
    const likeIcon = isLiked ? (
      <svg className="svg-icon" style={{width: "2em", height: "2em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M511.896646 844.534606 177.872107 532.840654c-82.664721-77.16752-86.735433-206.788693-8.91709-289.017486 38.733163-40.901549 93.480045-64.358797 150.08832-64.358797 52.629661 0 102.662171 19.651572 141.005454 55.399751l51.888787 48.513924 51.934836-48.513924c38.394449-35.749202 88.420819-55.399751 141.04434-55.399751 56.615439 0 111.320365 23.503297 150.09446 64.443731 37.652552 39.774889 57.516971 91.750657 55.745628 146.369625-1.690502 54.531987-24.756847 105.208157-64.835657 142.561903L511.896646 844.534606 511.896646 844.534606zM511.896646 844.534606" />
      </svg>
    ) : (
      <svg className="svg-icon" style={{width: "1em", height: "1em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden"}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M526.464 159.573333C572.586667 113.472 631.893333 85.333333 704 85.333333c155.221333 0 277.333333 126.869333 277.333333 305.408 0 107.093333-52.693333 196.138667-150.016 292.202667-20.949333 20.693333-84.970667 79.317333-87.850666 82.090667-9.066667 8.618667-18.837333 17.557333-29.290667 26.773333a1554.282667 1554.282667 0 0 1-41.301333 35.114667c-29.866667 24.533333-61.76 49.237333-93.632 72.917333a2607.744 2607.744 0 0 1-42.688 31.061333 42.666667 42.666667 0 0 1-49.109334 0 2607.744 2607.744 0 0 1-42.709333-31.04 2444.010667 2444.010667 0 0 1-93.610667-72.938666 1554.282667 1554.282667 0 0 1-41.301333-35.114667c-10.453333-9.216-20.224-18.154667-29.290667-26.773333-2.88-2.773333-66.901333-61.418667-87.850666-82.090667C95.381333 586.88 42.666667 497.856 42.666667 390.741333 42.666667 212.181333 164.778667 85.333333 320 85.333333c72.106667 0 131.413333 28.117333 177.536 74.24 5.184 5.184 10.005333 10.368 14.464 15.488 4.48-5.12 9.28-10.304 14.464-15.466666z m1.898667 671.786667A2360.746667 2360.746667 0 0 0 618.666667 761.002667a1469.802667 1469.802667 0 0 0 39.04-33.173334c9.664-8.533333 18.645333-16.746667 26.88-24.576 3.989333-3.797333 67.2-61.717333 86.784-81.024C853.952 540.672 896 469.674667 896 390.741333 896 258.624 811.349333 170.666667 704 170.666667c-47.765333 0-86.144 18.197333-117.205333 49.258666a202.325333 202.325333 0 0 0-27.946667 35.029334 129.728 129.728 0 0 0-7.872 13.909333c-15.04 33.749333-62.933333 33.749333-77.952 0a129.728 129.728 0 0 0-7.850667-13.909333 202.325333 202.325333 0 0 0-27.968-35.029334C406.144 188.864 367.765333 170.666667 320 170.666667c-107.349333 0-192 87.957333-192 220.074666 0 78.933333 42.026667 149.930667 124.629333 231.466667 19.562667 19.328 82.794667 77.248 86.784 81.045333 8.234667 7.829333 17.216 16.042667 26.88 24.576 12.074667 10.666667 25.130667 21.76 39.04 33.173334a2360.746667 2360.746667 0 0 0 106.666667 82.410666c5.205333-3.818667 10.666667-7.829333 16.362667-12.053333z" fill="" />
      </svg>
    );
    
    return (
      <div onClick={() => handleLike(item._id)}>
        <div>{likeIcon}</div>
        <div style={{color:"#6c7293"}}>{item.likes.length} Likes</div>
      </div>
    );
  };

  const renderPostItem = (item) => (
    <div key={item._id} className="col-md-6 col-xl-4 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{item.head}</h4>
          <div className="d-flex py-4">
            <div className="preview-list w-100">
              <div className="preview-item p-0">
                <div className="preview-thumbnail">
                  <img src={getProfilePicture()} className="rounded-circle" alt="" />
                </div>
                <div className="preview-item-content d-flex flex-grow">
                  <div className="flex-grow">
                    <div className="d-flex d-md-block d-xl-flex justify-content-between">
                      <h6 style={{color:"green"}} className="preview-subject">
                        {item.user.substring(0, item.user.indexOf('@'))}
                      </h6>
                      <p className="text-muted text-small">{item.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-muted">{item.body}</p>
        </div>
        <div className="flex items-center flex-wrap">
          <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" 
             id={item._id} 
             onClick={() => props.see(item)}>
            See More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
          <span onClick={() => props.see(item)} className="text-gray-400 inline-flex items-center leading-none text-sm">
            <svg className="w-8 h-8 mr-1" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            {item.comments.length} comments
          </span>
          {renderLikeButton(item)}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div id="load"></div>
      <div style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        marginLeft: "40%",
        marginRight: "40%"
      }}>
        <div style={{width: "128px", marginLeft: "12%"}}>
          <img src={getProfilePicture()} alt="Profile" />
        </div>
      </div>
      <div>
        Profile<br />
        Name: {props.props.name}
      </div>
      <div className="row">
        {fpost1.slice().reverse().map(renderPostItem)}
      </div>
    </>
  );
}

import React from 'react';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyDMBAkNXYBoiG0QNVpDGu_2tYQWhs4soJA';



class App extends React.Component {

    state = {
        videos: [],
        selectedVideo: null
    }

    onTermSubmit = (term) => {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${term}&key=${KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let videos = data.items
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })
        })
    }

    onVideoSelect = video => {
        this.setState({
            selectedVideo: video
        })
    }

    componentDidMount() {
        this.onTermSubmit('dolphins');
    }

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
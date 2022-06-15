import React from 'react'
import '../styles/App.css'
import InfoField from './InfoField'


function InfoBox({posts}) {
  return (
    <div className="info-box">
        
        {posts.map(post=> 
            <div key = {post.id} >
              <InfoField name={post.name} info = {post.info} key = {post.id} />
              
              <hr />
            </div>
        )}
        
    </div>
  )
}

export default InfoBox
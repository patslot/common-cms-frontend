import React from 'react';

// const post = {
//     "id": 2,
//     "likes": 5,
//     "author": null,
//     "description": "my second testing post",
//     "published_at": "2020-12-08T05:52:27.319Z",
//     "created_at": "2020-12-08T05:52:23.370Z",
//     "updated_at": "2020-12-08T05:52:27.340Z",
//     "image": {
//         "id": 1,
//         "name": "1080x1080-thumbnail-Pro1125-PAT (1).jpg",
//         "alternativeText": "",
//         "caption": "",
//         "width": 1080,
//         "height": 1080,
//         "formats": {
//             "thumbnail": {
//                 "name": "thumbnail_1080x1080-thumbnail-Pro1125-PAT (1).jpg",
//                 "hash": "thumbnail_1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32",
//                 "ext": ".jpg",
//                 "mime": "image/jpeg",
//                 "width": 156,
//                 "height": 156,
//                 "size": 9.06,
//                 "path": null,
//                 "url": "/uploads/thumbnail_1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32.jpg"
//             },
//             "large": {
//                 "name": "large_1080x1080-thumbnail-Pro1125-PAT (1).jpg",
//                 "hash": "large_1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32",
//                 "ext": ".jpg",
//                 "mime": "image/jpeg",
//                 "width": 1000,
//                 "height": 1000,
//                 "size": 174.41,
//                 "path": null,
//                 "url": "/uploads/large_1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32.jpg"
//             },
//             "medium": {
//                 "name": "medium_1080x1080-thumbnail-Pro1125-PAT (1).jpg",
//                 "hash": "medium_1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32",
//                 "ext": ".jpg",
//                 "mime": "image/jpeg",
//                 "width": 750,
//                 "height": 750,
//                 "size": 114.34,
//                 "path": null,
//                 "url": "/uploads/medium_1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32.jpg"
//             },
//             "small": {
//                 "name": "small_1080x1080-thumbnail-Pro1125-PAT (1).jpg",
//                 "hash": "small_1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32",
//                 "ext": ".jpg",
//                 "mime": "image/jpeg",
//                 "width": 500,
//                 "height": 500,
//                 "size": 59.33,
//                 "path": null,
//                 "url": "/uploads/small_1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32.jpg"
//             }
//         },
//         "hash": "1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32",
//         "ext": ".jpg",
//         "mime": "image/jpeg",
//         "size": 191.26,
//         "url": "/uploads/1080x1080_thumbnail_Pro1125_PAT_1_abc0c69a32.jpg",
//         "previewUrl": null,
//         "provider": "local",
//         "provider_metadata": null,
//         "created_at": "2020-12-08T03:54:31.244Z",
//         "updated_at": "2020-12-08T03:54:31.258Z"
//     }
// }
const API_URL = 'http://localhost:1337'
const formatImageUrl = (url) => `${API_URL}${url}`

// eslint-disable-next-line import/no-anonymous-default-export
export default ({description, likes, url}) => {


    return (
        <div className="Post">
            <img className="post_image" src={formatImageUrl(url)} alt={description} />
            <h4>{description} </h4>
            <div>
            <span>Likes: {  likes }</span>
            </div>
        </div>
    )
}
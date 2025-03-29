# API调用例子
```typescript
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"model":"Kwai-Kolors/Kolors","prompt":"an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the sea","negative_prompt":"<string>","image_size":"1024x1024","batch_size":1,"seed":4999999999,"num_inference_steps":20,"guidance_scale":7.5,"image":"data:image/webp;base64, XXX"}'
};

fetch('https://api.siliconflow.cn/v1/images/generations', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

# API参数说明


```

创建图片生成请求
Creates an image response for the given prompt. The URL for the generated image is valid for one hour. Please make sure to download and store it promptly to avoid any issues due to URL expiration.
POST
/
images
/
generations

Try it
Authorizations
​
Authorization
stringheaderrequired
Use the following format for authentication: Bearer <your api key>
Body
application/json
​
model
enum<string>default:Kwai-Kolors/Kolorsrequired
Corresponding Model Name. To better enhance service quality, we will make periodic changes to the models provided by this service, including but not limited to model on/offlining and adjustments to model service capabilities. We will notify you of such changes through appropriate means such as announcements or message pushes where feasible.
Available options: Kwai-Kolors/Kolors 
​
prompt
stringdefault:an island near sea, with seagulls, moon shining over the sea, light house, boats int he background, fish flying over the searequired
​
image_size
enum<string>default:1024x1024required
Available options: 1024x1024, 960x1280, 768x1024, 720x1440, 720x1280, others 
​
batch_size
integerdefault:1required
number of output images
Required range: 1 <= x <= 4
​
num_inference_steps
integerdefault:20required
number of inference steps
Required range: 1 <= x <= 100
​
guidance_scale
numberdefault:7.5required
This value is used to control the degree of match between the generated image and the given prompt. The higher the value, the more the generated image will tend to strictly match the text prompt. The lower the value, the more creative and diverse the generated image will be, potentially containing more unexpected elements.
Required range: 0 <= x <= 20
​
negative_prompt
string
negative prompt
​
seed
integer
Required range: 0 <= x <= 9999999999
​
image
stringdefault:data:image/webp;base64, XXX
The image that needs to be uploaded should be converted into base64 format.
Response
200

application/json
200
​
images
object[]

Hide child attributes
​
images.url
string
The URL for the generated image is valid for one hour. Please make sure to download and store it promptly to avoid any issues due to URL expiration.
​
timings
object

Hide child attributes
​
timings.inference
number
​
seed
integer


```



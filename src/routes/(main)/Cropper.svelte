<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
    import Cropper from 'svelte-easy-crop'
    const modalStore = getModalStore();
export let aspect = 1;
  
    export let image = "";
    export let cropShape = "round"
    let crop = { x: 0, y: 0 }
    // let a;
    let zoom = 1;
    let cropArea = {};
    function cropImage(image, area) {
  // Create a new canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set the canvas size to match the cropped area
  canvas.width = area.width;
  canvas.height = area.height;
  // Draw the image on the canvas, cropping it using the area data
ctx.drawImage(
    image,
    area.x, area.y,       // The x/y coordinates of the top-left corner of the area to crop
    area.width, area.height,  // The width/height of the area to crop
    0, 0,               // Where to draw the cropped image on the canvas
    area.width, area.height   // The dimensions of the cropped image
);

// Get the cropped image as a Data URL (base64 encoded image)
const croppedImageUrl = canvas.toDataURL(); 

// You can return the cropped image URL or handle it further
return croppedImageUrl;
}
// // Example usage:
// const img = new Image();
// img.onload = () => {
// const area = { x: 50, y: 50, width: 200, height: 200 };  // Example crop area
// const croppedImage = cropImage(img, area);
// console.log(croppedImage); // This will give you a base64 encoded string of the cropped image
// };

// Set image source (replace with your image URL)
// img.src = 'path_to_your_image.jpg';

</script>
{#if $modalStore[0]}
    <div>
        <div class="!flex !flex-col !w-screen !h-screen !fixed !top-0 !left-0">
            <div class="w-full h-20 bg-surface-500 flex">
                <div class="flex-auto flex items-center justify-start pl-8">
                    <h1 class="h3 font-bold">Crop Image</h1>
                </div>
                <div class="p-4">
                    <button class="variant-filled-success btn" on:click={()=>{
                        let img = new Image();
                        img.onload = function() {
                            let croppedImage = cropImage(img, cropArea.pixels)
                            $modalStore[0].response(croppedImage)
                            modalStore.close()
                        }
                        img.src = image;
                    }}>
                        Done
                    </button>
                </div>
            </div>
            <div class="!relative w-full flex-auto bg-surface-900/40 backdrop-blur-sm">
                <Cropper
                {image}
                bind:crop
                bind:zoom
                zoomSpeed={0.1}
                cropShape={cropShape}
                aspect={aspect}
                maxZoom={3.0}
                restrictPosition={true}
                on:cropcomplete={e => cropArea = e.detail}
            />
            </div>
            <div class="h-fit p-4 bg-surface-500 w-full">
                <input type="range" max="3.0" min="1.0" step="0.1" bind:value={zoom} />
            </div>
        </div>

    </div>
{/if}
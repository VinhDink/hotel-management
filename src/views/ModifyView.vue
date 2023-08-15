<template>
	<div class="body">
		<div class="title-box">
			<h1 class="title">Modify</h1>
		</div>
		<form @submit.prevent="update" class="form-box">
			<div class="form">
				<div class="column">
					<div class="input-box">
						<label for="name" class="label">
							<span>
								Room Name
							</span>
							<button type="button" @click="showInput('name')" class="modify-button">Modify</button>
						</label>
						<input type="text" id="name" name="name" v-model="name" class="input">
					</div>
					<div class="input-box">
						<label for="image_first" class="label">
							<span>
								First Image
							</span>
							<button type="button" @click="showInput('image_first')" class="modify-button">Modify</button>
						</label>
						<input type="file" ref="fileInput" @change="imageFirst" id="image_first" name="image_first"
							class="input">
					</div>
					<div class="input-box">
						<label for="image_second" class="label">
							<span>
								Second Image
							</span>
							<button type="button" @click="showInput('image_second')" class="modify-button">Modify</button>
						</label>
						<input type="file" ref="fileInput" @change="imageSecond" id="image_second" name="image_second"
							class="input">
					</div>
					<div class="input-box">
						<label for="image_third" class="label">
							<span>
								Third Image
							</span>
							<button type="button" @click="showInput('image_third')" class="modify-button">Modify</button>
						</label>
						<input type="file" ref="fileInput" @change="imageThird" id="image_third" name="image_third"
							class="input">
					</div>
					<div class="input-box">
						<label for="type" class="label">
							<span>
								Type
							</span>
							<button type="button" @click="showInput('type')" class="modify-button">Modify</button>
						</label>
						<input type="text" id="type" name="type" v-model="type" class="input">
					</div>
					<div class="input-box">
						<label for="hour_price" class="label">
							<span>
								Hour Price
							</span>
							<button type="button" @click="showInput('hour_price')" class="modify-button">Modify</button>
						</label>
						<input type="text" id="hour_price" name="hour_price" v-model="hour_price" class="input">
					</div>
					<div class="input-box">
						<label for="day_price" class="label">
							<span>
								Day Price
							</span>
							<button type="button" @click="showInput('day_price')" class="modify-button">Modify</button>
						</label>
						<input type="text" id="day_price" name="day_price" v-model="day_price" class="input">
					</div>
				</div>
				<div class="column">
					<div class="input-box">
						<label for="size" class="label">
							<span>
								Size
							</span>
							<button type="button" @click="showInput('size')" class="modify-button">Modify</button>
						</label>
						<input type="number" id="size" name="size" v-model="size" class="input">
					</div>
					<div class="input-box">
						<label class="label">
							<span>
								Balcony
							</span>
							<button type="button" @click="showInput('balcony')" class="modify-button">Modify</button>
						</label>
						<div>
							<div class="">
								<select name="balcony" id="balcony" v-model="balcony" class="input">
									<option value="1">True</option>
									<option value="0">False</option>
								</select>
							</div>
						</div>
					</div>
					<div class="input-box">
						<label for="view" class="label">
							<span>
								View
							</span>
							<button type="button" @click="showInput('view')" class="modify-button">Modify</button>
						</label>
						<input type="text" id="view" name="view" v-model="view" class="input">
					</div>
					<div class="input-box">
						<label for="description" class="label">
							<span>
								Description
							</span>
							<button type="button" @click="showInput('description')" class="modify-button">Modify</button>
						</label>
						<input type="text" id="description" name="description" v-model="description" class="input">
					</div>
					<div class="input-box">
						<label class="label">
							<span>
								Smoking
							</span>
							<button type="button" @click="showInput('smoking')" class="modify-button">Modify</button>
						</label>
						<div>
							<div class="">
								<select name="smoking" id="smoking" v-model="smoking" class="input">
									<option value="1">True</option>
									<option value="0">False</option>
								</select>
							</div>
						</div>
					</div>
					<div class="input-box">
						<label for="floor" class="label">
							<span>
								Floor
							</span>
							<button type="button" @click="showInput('floor')" class="modify-button">Modify</button>
						</label>
						<input type="number" id="floor" name="floor" v-model="floor" class="input">
					</div>
					<div class="input-box">
						<label class="label">
							<span>
								Bathtub
							</span>
							<button type="button" @click="showInput('bathtub')" class="modify-button">Modify</button>
						</label>
						<div>
							<div class="">
								<select name="bathtub" id="bathtub" v-model="bathtub" class="input">
									<option value="1">True</option>
									<option value="0">False</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="">
					<button type="submit" class="submit-button w-100" :class="{ 'mt-3': width <= 425 }">
						<i class="bi bi-send">submit</i>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from '../config'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'ModifyView',

	setup() {
		const width = ref(window.innerWidth)
		const router = useRouter()
		const route = useRoute()
		const id = route.params.id
		const imageFirstFile = ref(null)
		const imageSecondFile = ref(null)
		const imageThirdFile = ref(null)

		const imageFirst = (event) => {
			imageFirstFile.value = event.target.files[0]
		}

		const imageSecond = (event) => {
			imageSecondFile.value = event.target.files[0]
		}

		const imageThird = (event) => {
			imageThirdFile.value = event.target.files[0]
		}


		/**
		 * Get room data
		 *
		 * @return void
		 */

		const update = async () => {
			const formData = new FormData()
			const form = document.querySelector('form')
			formData.append('id', id)
			for (let input of form) {
				if (input.value !== '') {
					if (input.name == 'image_first') {
						formData.append('image_first', imageFirstFile.value)
					}
					if (input.name == 'image_second') {
						formData.append('image_second', imageSecondFile.value)
					}
					if (input.name == 'image_third') {
						formData.append('image_third', imageThirdFile.value)
					}
					else if (input.name !== 'image_first' && input.name !== 'image_second' && input.name !== 'image_third') {
						formData.append(input.name, input.value)
					}
				}

			}
			// for (const value of formData.values()) {
			//   conse.log(value);
			// }
			await axios.post('room/modify', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			router.push({ name: 'Room' })

		}
		return {
			update,
			id,
			router,
			imageFirst,
			imageSecond,
			imageThird,
			width
		}
	},

	methods: {
		//display input field on click
		showInput(input) {
			console.log(input)
			const id = ref(document.getElementById(input));

			if (id.value.style.display === "") {
				id.value.style.display = "block";
			} else {
				id.value.style.display = "";
			}
		}
	}
})
</script>    

<style scoped>
.form-box {
	border: 2px rgb(222, 222, 222) solid;
	border-radius: 15px;
	padding: 5px;
}

.input-box {
	border-bottom: 1px solid rgb(178, 178, 178);
}

@media (min-width: 769px) {
	.body {
		background-color: rgb(240, 240, 240);
		display: flex;
		flex-direction: column;
		padding: 20px;
		border-radius: 3px;
		min-height: 100%;
	}

	.input {
		display: none;
		border: none;
		border-radius: 5px;
	}

	.form {
		display: flex;
		justify-content: space-between;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.label {
		padding: 10px;
		border-radius: 5px;
		font-size: 13px;
		width: 300px;
		display: flex;
		justify-content: space-between;
		color: rgb(178, 178, 178);
	}


}

@media (max-width:768px) {
	.body {
		background-color: rgb(240, 240, 240);
		display: flex;
		flex-direction: column;
		padding: 20px;
		border-radius: 3px;
		min-height: 100%;
	}

	.input {
		display: none;
		border: none;
		border-radius: 5px;
		width: 100%;
	}
	.label {
		padding: 10px;
		border-radius: 5px;
		font-size: 13px;
		width: 300px;
		display: flex;
		justify-content: space-between;
		color: rgb(178, 178, 178);
	}

}
</style>

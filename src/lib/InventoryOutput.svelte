<script>
  import { db } from "../firebase";
  import { collectionData } from "../../node_modules/rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import { collection, addDoc, query, where, getDocs, deleteDoc, doc, onSnapshot, orderBy } from "firebase/firestore";
  import { onMount } from "svelte";

  const colRef = collection(db, "inventory");
  const sortedQuery = query(colRef, orderBy("name", "asc"));
  const items = collectionData(sortedQuery).pipe(startWith([]));  

  //Add a new item
  let name;
  let type;
  let checkedOutTo;
  let checkedOut;
  let checkedIn;
  let comments; 
  async function submitNewItem(){    
    console.log("working");
    await addDoc(colRef, {
      name: name,
      type: type,
      checkedOutTo: checkedOutTo,
      checkedOut: checkedOut,
      checkedIn: checkedIn,
      comments: comments      
    });     
    name = "";
    type = "";
    checkedOutTo = "";
    checkedOut = "";
    checkedIn = "";
    comments = "";
    console.log("complete")
  }

</script>

<style>
  /* Add form styles */
  form{
    background-color: #e9f5db;
    border: 2px solid #718355;
    border-radius: 1rem;
    padding: 2rem;
    width: fit-content;
    /* display: none; */
  }
  label, button{
    color: #2f2f2f;
    font-weight: 800;
    display: block;
    margin-bottom: 0.5rem;
  }
  input, textarea, select{
    margin-bottom: 1rem;
  }
  select{
    min-width: 200px;
  }
  /* Inventory card styles */
  .inventory-card-wrapper{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .inventory-card{
    background-color: gray;
    padding: 1rem;
    box-shadow: 4px 4px 4px #474747;
  }
  .inventory-card p:last-child{
    margin-bottom: 0;
  }
  .inventory-card p:first-child{
    margin-top: 0;
  }
</style>

<h1>
  All items...
</h1>

<form on:submit|preventDefault={submitNewItem}>
  <label for="item-name">Item name:</label>
  <input name="item-name" type="text" bind:value={name} />
  <label for="item-type">Item type:</label>
  <select name="item-type" id="item-type" bind:value={type}>
    <option value=""></option>
    <option value="Toy">Toy</option>
    <option value="Bed">Bed</option>
    <option value="Lease">Lease</option>
    <option value="Food">Food</option>
  </select>
  <label for="checked-out-to">Checked out to:</label>
  <select name="checked-out-to" id="checked-out-to" bind:value={checkedOutTo}>
    <option value=""></option>
    <option value="Dominic">Dominic</option>
    <option value="Chester">Chester</option>
    <option value="Sarah">Sarah</option>
    <option value="Anna">Anna</option>
  </select>
  <label for="date-checked-out">Date checked out:</label>
  <input name="date-checked-out" type="date" bind:value={checkedOut}/>
  <label for="date-returned">Date returned:</label>
  <input name="date-returned" type="date" bind:value={checkedIn}/>
  <label for="item-comments">Comments:</label>
  <textarea rows="4" name="item-comments"  bind:value={comments}/>
  <button type="submit">
    Submit
  </button>
</form>

<section class="inventory-card-wrapper">
  {#each $items as item}
    <div class="inventory-card">
      <p>Name: {item.name}</p>
      <p>Type: {item.type}</p>
      <p><i class="fa-solid fa-user"></i> Checked out to: {item.checkedOutTo}</p>
      <p>Checked out date: {item.checkedOut}</p>
      <p>Checked in date: {item.checkedIn}</p>
      <p>Comments: {item.comments}</p>
    </div>
  {/each}
</section>

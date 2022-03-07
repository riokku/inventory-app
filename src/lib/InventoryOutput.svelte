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
  form{
      background-color: #e9f5db;
      border: 2px solid #718355;
      border-radius: 1rem;
      padding: 2rem;
      width: fit-content;
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
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>
  <label for="checked-out-to">Checked out to:</label>
  <select name="checked-out-to" id="checked-out-to" bind:value={checkedOutTo}>
    <option value=""></option>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
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

{#each $items as item}
  <p>{item.comments}</p>
{/each}
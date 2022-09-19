
let myLibrary = [{title: 'A tale of blood and iron', author: 'AlterEgo' no_pages:234, read=true}]}]

function Book(id, title, author, no_pages, read=false) {
    this.id = id
    this.title = title
    this.author = author
    this.no_pages = no_pages
    this.read = read
  }

let form = document.querySelector('#add-book')
let home = document.querySelector('.book-container')
home.innerHTML = myLibrary

form.addEventListener('submit', (event) => {
  event.preventDefault()

    title = form['title'].value
    author = form['author'].value
    no_pages = form['pages'].value
    read = form['read'].checked
    id = myLibrary.length
    let book_item = new Book(id, title, author, no_pages, read)
    if (isNaN(no_pages) == true) {
      document.querySelector('.pages').innerHTML += "<p *style='color: red; margin:0; padding:0'>*Wrong input on number of pages. Expected a number</p>"
      return false
    }
    else {
      Array.from(form.elements).forEach(element => {
        if (element.type != 'submit') {
          element.value = ''
        }
      })
      myLibrary.push(book_item)
      home.innerHTML += `<div class="book-wrapper" data-item-id=${id}>
                            <div><img class="img" src="img.png" alt="pic" srcset=""></div>
                            <div class="titles">
                              <div><h4>${title}</h4></div>
                              <div class="author">${author}</div>
                              <div class="pages">${no_pages} pages</div>
                              <div><button class="status" data-item-id=${id}>${read ? 'Read': 'Unread'}</button></div>
                              <div><button class="delete" data-item-id=${id}>Delete</button></div>
                              </div>
                          </div>
      `
      Book.prototype.updateRead = function() {
        let read_status = this.read 
        if (read_status == true) {
          this.read = false
        }
        else {
          this.read = true
        }
        return read_status
        console.log(read_status)
      }
      let status_btn = document.querySelectorAll('.status')
      if (status_btn.length != 0) {
        status_btn.forEach(btn_child => {
          btn_child.addEventListener('click',() => {
            read = book_item.updateRead()
            let index_of_item = btn_child.dataset.itemId
            btn_child.innerHTML = read ? 'Read' : 'Unread'
        })
        })
      }
     
      let delete_button = document.querySelectorAll('.delete')
      if (delete_button.length != 0) {
        delete_button.forEach(btn_child_delete => {
          btn_child_delete.addEventListener('click',() => {
            read = book_item.updateRead()
            let index_of_item = btn_child_delete.dataset.itemId
            let temp = String(index_of_item)
            let remove_div = document.querySelector(`[data-item-id="${temp}"]`)
            delete myLibrary[index_of_item]
            remove_div.remove()
            
        })
        })
      }
    }

  })

// let status_btn = document.querySelectorAll('.status')
// if (status_btn.length != 0) {
//   status_btn.forEach(btn_child => {
//     btn_child.addEventListener('click',() => {
//       if (btn_child.innerHTML == 'Read') {
//         btn_child.innerHTML = 'Unread'
//       }
//       else {
//         btn_child.innerHTML = "Read"
//       }

//   })
//   })
// }

class NodeItem {
  #value;

  constructor(value) {
    this.#value = value;
    this.next = null;
  }

  getValue() {
    return this.#value;
  }
}

class Queue {
  #length;
  #head;
  #tail;

  constructor(headNodeValue) {
    this.#head = headNodeValue ? new NodeItem(headNodeValue) : null;
    this.#tail = null;
    this.#length = headNodeValue ? 1 : 0;
  }

  enqueue(value) {
    const newNode = new NodeItem(value);
    if (this.#head === null) {
      this.#head = newNode;
    } else if (this.#tail === null) {
      this.#tail = newNode;
      this.#head.next = this.#tail;
    } else {
      const tempTail = this.#tail;
      tempTail.next = newNode;
      this.#tail = newNode;
    }
    this.#length++;
  }

  dequeue() {
    if (this.#head === null) {
      // Queue is empty
      return null;
    } else {
      const tempHead = this.#head;
      if (this.#tail === null) {
        this.#head = null;
      } else if (this.#head.next === this.#tail) {
        // only head and tail remaining
        this.#head = this.#tail;
        this.#tail = null;
      } else {
        this.#head = this.#head.next;
      }
      return tempHead;
    }
  }

  peek() {
    return this.#head.getValue();
  }

  getLength() {
    return this.#length;
  }

  print() {
    let temp = this.#head;
    while (temp !== null) {
      console.log(temp.getValue());
      temp = temp.next;
    }
  }
}

class MyQueue
  def initialize
    @store  = []
  end

  def enqueue(item)
    @store << item
  end

  def dequeue(n = 1)
    n.times { @store.shift }
  end

  def peek
    @store.first
  end

  def size
    @store.length
  end

  def empty?
    @store.emtpy?
  end
end

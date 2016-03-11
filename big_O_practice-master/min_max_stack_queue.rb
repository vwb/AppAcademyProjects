require_relative "stack_queue"

class MinMaxStackQueue
  def initialize
    @queue = StackQueue.new
  end

  def enqueue(item)
    @queue.enqueue(item)
  end

  def dequeue
    @queue.dequeue
  end

  def min
    @queue.min
  end

  def max
    @queue.max
  end

  def size
    @queue.size
  end


end

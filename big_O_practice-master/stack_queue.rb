require_relative "my_stack"

class StackQueue
  def initialize
    @primary_stack = MyStack.new
    @dequeue_stack = MyStack.new
  end

  def enqueue(item)
    @primary_stack.push(item)
  end

  def dequeue
    if @dequeue_stack.empty?
      until @primary_stack.empty?
        @dequeue_stack.push(@primary_stack.pop)
      end
    end
    @dequeue_stack.pop
  end

  def empty?
    @primary_stack.empty? && @dequeue_stack.empty?
  end

  def size
    @primary_stack.size + @dequeue_stack.size
  end

  def min
    if !(@primary_stack.empty? || @dequeue_stack.empty?)
      @primary_stack.min < @dequeue_stack.min ? @primary_stack.min : @dequeue_stack.min
    elsif @primary_stack.empty? && !(@dequeue_stack.empty?)
      @dequeue_stack.min
    elsif !(@primary_stack.empty?)
      @primary_stack.min
    end
  end

    def max
      if !(@primary_stack.empty? || @dequeue_stack.empty?)
        @primary_stack.max > @dequeue_stack.max ? @primary_stack.max : @dequeue_stack.max
      elsif @primary_stack.empty? && !(@dequeue_stack.empty?)
        @dequeue_stack.max
      elsif !(@primary_stack.empty?)
        @primary_stack.max
      end
    end

end

class MyStack
  def initialize
    @store = []
    @min = nil
    @max = nil
  end

  def pop
    var = @store.pop
    if self.empty?
      @min = nil
      @max = nil
    else
      @min = self.peek[1]
      @max = self.peek.last
    end
    var.first
  end

  def push(item)
    min = min_check(item)
    max = max_check(item)
    @store << [item, min, max]
  end

  def min_check(item)
    if @min.nil? || item < @min
      @min = item
    end
    @min
  end

  def max_check(item)
    if @max.nil? || item > @max
      @max = item
    end
    @max
  end

  def max
    @max
  end

  def min
    @min
  end

  def peek
    @store.last
  end

  def size
    @store.length
  end

  def empty?
    @store.empty?
  end
end

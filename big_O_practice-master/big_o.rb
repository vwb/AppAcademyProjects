
require_relative "min_max_stack_queue"



list = [ 0, 3, 5, 4, -5, 10, 1, 90 ]
def min(arr)
  smallest_so_far = nil
  arr.each do |ele|
    if smallest_so_far.nil? || smallest_so_far > ele
      smallest_so_far = ele
    end
  end
  smallest_so_far
end

# p min(list)

def largest_contiguous_subsum(list)
  sub_arrays = []
  largest_sum = nil
  list.length.times do |outer_runner|
    outer_runner.upto(list.length) do |inner_runner|
      sub_arrays << list[outer_runner..inner_runner]
    end
  end

  sub_arrays.each do |sub_array|
    test_sum = sub_array.inject(:+)
    if largest_sum.nil? || largest_sum < test_sum
      largest_sum = test_sum
    end
  end

  largest_sum
end


list = [5,3,-7]


def better_largest_subsum(list)
  largest_sum = 0
  current_sum = 0
  list.each do |item|
    if current_sum < 0
      current_sum = item
    else
      current_sum += item
    end
    if largest_sum < current_sum
      largest_sum = current_sum
    end
  end
  largest_sum
end



#return an array of every combination
def first_anagram?(word1, word2)
  permutations = word1.split('').permutation.to_a.map(&:join)
  permutations.include?(word2)
end


def second_anagram?(word1, word2)
  word2 = word2.split('')
  word1_split = word1.split('')
  word1.split('').each do |letter|
    if word2.include?(letter)
      word1_split.delete(letter)
      word2.delete(letter)
    end
  end
  word1_split.empty? and word2.empty?
end

def third_anagram?(word1, word2)
  (word1.chars.sort) == (word2.chars.sort)
end

def fourth_anagram?(word1, word2)
  letter_hash = Hash.new {|h, k| h[k]=0}
  word1.chars.each {|letter| letter_hash[letter] += 1}
  word2.chars.each {|letter| letter_hash[letter] -= 1}
  letter_hash.values.all? {|val| val == 0}
end


def two_sum?(array, target_sum)
  array.each_with_index do |num1, index1|
    array.drop(index1 + 1).each_with_index do |num2, index2|
      return true if ((num1 + num2) == target_sum)
    end
  end
  false
end

def okay_two_sum?(array, target_sum)
  array = array.sort
  i, j = 0 , (array.length - 1)
  until i == j
    val = (array[i] + array[j]) <=> target_sum
    if val == 1
      j -= 1
    elsif val == -1
      i += 1
    else
      return true
    end
  end
  false
end

def hash_two_sum?(array, target_sum)
  hash_sum = {}
  array.each do |num|
    return true if hash_sum[(target_sum - num)]
    hash_sum[num] = true
  end
  false
end

def windowed_max_range(array, window)
  current_max_range = nil
  id = 0
  until (window + id) == array.length + 1
    sub_array = array[id...(window + id)]
    difference = (sub_array.max - sub_array.min).abs
    if current_max_range.nil? || difference > current_max_range
      current_max_range = difference
    end
    id += 1
  end
  current_max_range
end

def range_thing(array, window)
  q = MinMaxStackQueue.new
  largest_range = nil
  0.upto(window - 1) do |i|
    q.enqueue(array[i])
  end

  array.drop(window).each do |num|
    q.enqueue(num)
    q.dequeue
    difference = (q.max - q.min).abs

    if largest_range.nil? || largest_range < difference
      largest_range = difference
    end
  end
  largest_range
end

p  range_thing([1, 0, 2, 5, 4, 8], 2)  # 4
p  range_thing([1, 0, 2, 5, 4, 8], 3)  # 5
p  range_thing([1, 0, 2, 5, 4, 8], 4)  # 6
p  range_thing([1, 3, 2, 5, 4, 8], 5)  # 6

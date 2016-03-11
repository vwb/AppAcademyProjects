class Player

  def initialize(name)
    @name = name
  end

  def get_input
    input = STDIN.gets.chomp.split
    input[0] = input[0].downcase.to_sym
    input[1] = input[1].strip.split(",").map {|num| Integer(num)}
    input
  end

  def prompt
    puts "Please enter a move with the format 'f 1,1'"
    puts "Prefix with 'f' to flag or 'r' to expose"
    print >
  end
end

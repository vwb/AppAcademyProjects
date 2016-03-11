class Tile
  POSSIBLE_MOVES = [[1,1],[1,-1],[-1,1],[-1,-1],[0,1],[1,0],[0,-1],[-1,0]]
  UPPER_LIMIT = 8
  attr_reader :is_bomb, :pos, :board
  attr_accessor :value, :revealed, :flagged

  #create a "state" hash
  #add ? methods for accessing t/f instance variables
  #write new inspect
  def initialize(board, pos, is_bomb=false)
    @pos = pos
    @board = board
    @is_bomb = is_bomb
    @flagged = false
    @revealed = false
    @value = nil
  end

  # def inspect
  #   @pos.inspect
  #   is_bomb.inspect
  #   flagged.inspect
  #   revealed.inspect
  # end

  #maybe add is_bomb logic/check etc.
  def reveal

    return if self.revealed
    self.revealed = true

    if neighbor_bomb_count > 0
      self.value = neighbor_bomb_count
      return
    end
    # p neighbors
    self.neighbors.each do |nei|
      if !nei.flagged && !nei.revealed && !nei.is_bomb
        nei.reveal
      end
    end
    # unless flagged && revealed && is_bomb
    #   neighbors.each{|chill_neighbor| chill_neighbor.reveal}
    # end
    return
  end

  def inspect
    p @pos
  end

  def flag
    flagged ? (flagged = true) : (flagged = false)
  end

  #return array of neighbors
  def neighbors
    neighbors = []
    generate_valid_moves.each do |pos|
      neighbors << board[pos]
    end
    neighbors
  end

  def generate_valid_moves
    neighbors = []
    POSSIBLE_MOVES.each do |move|
      neighbors << [(move[0] + pos[0]),(move[1] + pos[1])]
    end
    neighbors.reject{|move| (move.max > UPPER_LIMIT || move.min < 0)}
  end

  def neighbor_bomb_count
    explosive_neighbors = neighbors.select { |neighbor| neighbor.is_bomb}
    p explosive_neighbors.length
  end

end

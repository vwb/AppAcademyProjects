require_relative 'board.rb'
require_relative 'tile.rb'
require_relative 'player.rb'



class Game
  attr_reader :board
  #add user customization features
  def initialize(player)
    @board = Board.new(9)
    @player = player
  end

  def play
    until won?
      board.render
      player.prompt
      player_input = player.get_input # MAKE THIS
      player_action, player_move_pos = player_input[0],player_input[1]
      tile = board[player_move_pos]

      if player_action == :f
        tile.flag
      else
        if tile.is_bomb
          bomb_clicked
          return
        end
        tile.reveal
      end

    end
  end

  #maybe a board method?
  def bomb_clicked
    puts "BOOM"
    puts "YOU BLEW YOURSELF UP!"
    #special render // reveal board
  end

  def won?
    board.each_with_index do |row, i|
      row.each_with_index do |col, j|
        pos = [i, j]
        return false if !board[pos].is_bomb? && !board[pos].revealed
      end
    end
    true
  end

end

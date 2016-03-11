# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  url        :string
#  content    :text
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ActiveRecord::Base
  validates :title,:author_id,presence:true
  # validates :post_subs,uniqueness: {scope: :subs}

  has_many :post_subs

  has_many :subs,
    through: :post_subs,
    source: :sub

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id


end

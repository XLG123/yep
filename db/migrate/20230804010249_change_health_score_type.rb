class ChangeHealthScoreType < ActiveRecord::Migration[7.0]
  def change
    change_column :businesses, :health_score, :string
  end
end

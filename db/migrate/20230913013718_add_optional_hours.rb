class AddOptionalHours < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :mon_optional, :string
    add_column :businesses, :tue_optional, :string
    add_column :businesses, :wed_optional, :string
    add_column :businesses, :thu_optional, :string
    add_column :businesses, :fri_optional, :string
    add_column :businesses, :sat_optional, :string
    add_column :businesses, :sun_optional, :string
  end
end

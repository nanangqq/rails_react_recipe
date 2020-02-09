class Gnlandpol < ApplicationRecord
    validates :pol, presence: true
    validates :pnu, presence: true
end

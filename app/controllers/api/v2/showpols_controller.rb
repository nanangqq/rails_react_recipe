def execute_statement(sql)
  results = ActiveRecord::Base.connection.execute(sql)

  if results.present?
    return results
  else
    return nil
  end
end

class Api::V2::ShowpolsController < ApplicationController
  def index
    pnus = land_params['pol'].gsub(' ','').split(',')
    # puts pnus
    # pnuString = ''
    # puts pnus.length
    # puns.each do |pnu|
    #   pnuStging += pnu
    #   pnu
    # puts "'"+pnus.join("','")+"'"
    # puts pnus
    # puts pnus.split(',')
    gnlandpol = execute_statement("select st_AsText(pol) pol, pnu from gnlandpols where pnu in ("+"'"+pnus.join("','")+"'"+")")
    # "INSERT INTO " + pol_params['table'] + " (pol, name) VALUES (st_geomfromtext('" + pol_params['pol'] + "',4326),'" + pol_params['name'] + "')"
    if gnlandpol
      render json: gnlandpol
    else
      render json: gnlandpol.errors
    end
  end

  private
  def land_params
    params.permit(:pol)
  end

end

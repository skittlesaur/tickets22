const getRecommendedForYou = async (prisma: any, currentDate: Date, locationData: any) => {

  let recommendedForYou

  if (locationData.country.name) {
    recommendedForYou = await prisma.match.findFirst({
      where: {
        OR: [
          {
            homeTeam: {
              name: locationData.country.name
            }
          },
          {
            awayTeam: {
              name: locationData.country.name
            }
          }
        ],
        date: {
          gt: currentDate
        },
        availableTickets: {
          some: {
            available: {
              gt: 0
            },
          }
        }
      },
      select: {
        matchNumber: true,
        roundNumber: true,
        date: true,
        stadium: {
          select: {
            name: true
          }
        },
        homeTeam: {
          select: {
            name: true
          }
        },
        homeScore: true,
        awayTeam: {
          select: {
            name: true
          }
        },
        awayScore: true,
        group: true,
      }
    })
  }

  if (!recommendedForYou) {
    if (locationData.continent.name) {
      recommendedForYou = await prisma.match.findFirst({
        where: {
          OR: [
            {
              homeTeam: {
                continent: locationData.continent.name
              }
            },
            {
              awayTeam: {
                continent: locationData.continent.name
              }
            }
          ],
          date: {
            gt: currentDate
          },
          availableTickets: {
            some: {
              available: {
                gt: 0
              },
            }
          }
        },
        select: {
          matchNumber: true,
          roundNumber: true,
          date: true,
          stadium: {
            select: {
              name: true
            }
          },
          homeTeam: {
            select: {
              name: true
            }
          },
          homeScore: true,
          awayTeam: {
            select: {
              name: true
            }
          },
          awayScore: true,
          group: true,
        }
      })
    }
  }

  if (!recommendedForYou) {
    recommendedForYou = await prisma.match.findMany({
      where: {
        date: {
          gt: currentDate
        },
        availableTickets: {
          some: {
            available: {
              gt: 0
            },
          }
        }
      },
      select: {
        matchNumber: true,
        roundNumber: true,
        date: true,
        stadium: {
          select: {
            name: true
          }
        },
        homeTeam: {
          select: {
            name: true
          }
        },
        homeScore: true,
        awayTeam: {
          select: {
            name: true
          }
        },
        awayScore: true,
        group: true,
      },
      take: 5
    })

    recommendedForYou = recommendedForYou[Math.floor(Math.random() * 5) + 1]
  }

  return recommendedForYou

}

export default getRecommendedForYou